import CV, { ICV } from '../models/CV.model';
import Candidate from '../models/Candidate.model';
import Job from '../models/Job.model';
import { CVAnalysisService } from './cv-analysis.service';
import { NotFoundError } from '../utils/errors';
import { paginate } from '../utils/helpers';
import fs from 'fs';
import path from 'path';

export class CVsService {
  private cvAnalysisService: CVAnalysisService;

  constructor() {
    this.cvAnalysisService = new CVAnalysisService();
  }

  async getCVs(filters: {
    jobId?: string;
    candidateId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 10 } = filters;
    const { skip, limit: limitNum } = paginate(page, limit);
    
    const query: any = {};
    
    if (filters.jobId) {
      query.jobId = filters.jobId;
    }
    
    if (filters.candidateId) {
      query.candidateId = filters.candidateId;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    const [cvs, total] = await Promise.all([
      CV.find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 })
        .populate('candidateId', 'name email')
        .populate('jobId', 'title company'),
      CV.countDocuments(query)
    ]);
    
    return {
      cvs,
      pagination: {
        page,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };
  }

  async uploadCV(file: Express.Multer.File, candidateId: string, jobId?: string): Promise<ICV> {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    if (jobId) {
      const job = await Job.findById(jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }
    }

    const cv = new CV({
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
      candidateId,
      jobId,
      status: 'UPLOADED'
    });

    return cv.save();
  }

  async getCVById(id: string): Promise<ICV | null> {
    const cv = await CV.findById(id)
      .populate('candidateId', 'name email')
      .populate('jobId', 'title company');
    
    if (!cv) {
      throw new NotFoundError('CV not found');
    }
    
    return cv;
  }

  async analyzeCV(id: string): Promise<ICV> {
    const cv = await CV.findById(id);
    if (!cv) {
      throw new NotFoundError('CV not found');
    }

    cv.status = 'ANALYZING';
    await cv.save();

    try {
      const cvText = await this.cvAnalysisService.extractText(cv.filePath, cv.mimeType);
      
      let jobDescription = '';
      if (cv.jobId) {
        const job = await Job.findById(cv.jobId);
        if (job) {
          jobDescription = job.description || '';
        }
      }

      const analysis = await this.cvAnalysisService.analyzeCV(cvText, jobDescription);

      cv.status = 'ANALYZED';
      cv.matchScore = analysis.matchScore;
      cv.analysisData = analysis.extractedData;
      cv.analyzedAt = new Date();

      // Update candidate with extracted data
      const candidate = await Candidate.findById(cv.candidateId);
      if (candidate) {
        candidate.skills = analysis.skills;
        candidate.experience = analysis.experience;
        candidate.matchScore = analysis.matchScore;
        
        // Auto-update status based on match score (only if status is NEW)
        // This allows manual status changes to be preserved
        if (candidate.status === 'NEW' && analysis.matchScore > 0) {
          if (analysis.matchScore >= 70) {
            // High match score (80-100%) - Auto shortlist
            candidate.status = 'SHORTLISTED';
          } else if (analysis.matchScore < 45) {
            // Low match score (<50%) - Auto reject
            candidate.status = 'REJECTED';
          }
          // Scores between 50-79% remain NEW for manual review
        }
        
        await candidate.save();
      }

      return cv.save();
    } catch (error) {
      cv.status = 'FAILED';
      await cv.save();
      throw error;
    }
  }

  async deleteCV(id: string): Promise<ICV | null> {
    const cv = await CV.findById(id);
    if (!cv) {
      throw new NotFoundError('CV not found');
    }

    // Delete file from filesystem
    if (fs.existsSync(cv.filePath)) {
      fs.unlinkSync(cv.filePath);
    }

    return CV.findByIdAndDelete(id);
  }

  async downloadCV(id: string): Promise<{ filePath: string; fileName: string }> {
    const cv = await CV.findById(id);
    if (!cv) {
      throw new NotFoundError('CV not found');
    }

    if (!fs.existsSync(cv.filePath)) {
      throw new NotFoundError('CV file not found');
    }

    return {
      filePath: cv.filePath,
      fileName: cv.fileName
    };
  }
}

