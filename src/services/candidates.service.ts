import Candidate, { ICandidate } from '../models/Candidate.model';
import Job from '../models/Job.model';
import CV from '../models/CV.model';
import { NotFoundError, ValidationError } from '../utils/errors';
import { paginate } from '../utils/helpers';

export class CandidatesService {
  async getCandidates(filters: {
    jobId?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 10 } = filters;
    const { skip, limit: limitNum } = paginate(page, limit);
    
    const query: any = {};
    
    if (filters.jobId) {
      query.jobId = filters.jobId;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { skills: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    
    const [candidates, total] = await Promise.all([
      Candidate.find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ matchScore: -1, createdAt: -1 })
        .populate('jobId', 'title company'),
      Candidate.countDocuments(query)
    ]);
    
    return {
      candidates,
      pagination: {
        page,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };
  }

  async getCandidateById(id: string): Promise<ICandidate | null> {
    const candidate = await Candidate.findById(id).populate('jobId', 'title company');
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }
    return candidate;
  }

  async createCandidate(data: any): Promise<ICandidate> {
    if (data.jobId) {
      const job = await Job.findById(data.jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }
    }

    const candidate = new Candidate(data);
    return candidate.save();
  }

  async updateCandidate(id: string, data: any): Promise<ICandidate | null> {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    // Validate status if provided
    if (data.status) {
      const validStatuses = ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'];
      if (!validStatuses.includes(data.status)) {
        throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
    }

    if (data.jobId) {
      const job = await Job.findById(data.jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }
    }

    // Update lastContact if status is being changed to INTERVIEWED, OFFERED, or HIRED
    if (data.status && ['INTERVIEWED', 'OFFERED', 'HIRED'].includes(data.status)) {
      data.lastContact = new Date();
    }

    Object.assign(candidate, data);
    return candidate.save();
  }

  async updateCandidateStatus(id: string, status: string): Promise<ICandidate | null> {
    const validStatuses = ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    candidate.status = status as any;
    
    // Update lastContact for certain status changes
    if (['INTERVIEWED', 'OFFERED', 'HIRED'].includes(status)) {
      candidate.lastContact = new Date();
    }

    return candidate.save();
  }

  async deleteCandidate(id: string): Promise<ICandidate | null> {
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    // Delete associated CVs
    await CV.deleteMany({ candidateId: id });

    return Candidate.findByIdAndDelete(id);
  }

  async rankCandidates(jobId: string): Promise<ICandidate[]> {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new NotFoundError('Job not found');
    }

    const candidates = await Candidate.find({ jobId })
      .sort({ matchScore: -1 })
      .populate('jobId', 'title company');

    return candidates;
  }

  async getCandidateCVs(candidateId: string) {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    const cvs = await CV.find({ candidateId })
      .sort({ createdAt: -1 })
      .populate('jobId', 'title company');

    return cvs;
  }
}

