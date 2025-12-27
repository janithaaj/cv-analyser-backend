"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVsService = void 0;
const CV_model_1 = __importDefault(require("../models/CV.model"));
const Candidate_model_1 = __importDefault(require("../models/Candidate.model"));
const Job_model_1 = __importDefault(require("../models/Job.model"));
const cv_analysis_service_1 = require("./cv-analysis.service");
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
const fs_1 = __importDefault(require("fs"));
class CVsService {
    constructor() {
        this.cvAnalysisService = new cv_analysis_service_1.CVAnalysisService();
    }
    async getCVs(filters) {
        const { page = 1, limit = 10 } = filters;
        const { skip, limit: limitNum } = (0, helpers_1.paginate)(page, limit);
        const query = {};
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
            CV_model_1.default.find(query)
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 })
                .populate('candidateId', 'name email')
                .populate('jobId', 'title company'),
            CV_model_1.default.countDocuments(query)
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
    async uploadCV(file, candidateId, jobId) {
        const candidate = await Candidate_model_1.default.findById(candidateId);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        if (jobId) {
            const job = await Job_model_1.default.findById(jobId);
            if (!job) {
                throw new errors_1.NotFoundError('Job not found');
            }
        }
        const cv = new CV_model_1.default({
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
    async getCVById(id) {
        const cv = await CV_model_1.default.findById(id)
            .populate('candidateId', 'name email')
            .populate('jobId', 'title company');
        if (!cv) {
            throw new errors_1.NotFoundError('CV not found');
        }
        return cv;
    }
    async analyzeCV(id) {
        const cv = await CV_model_1.default.findById(id);
        if (!cv) {
            throw new errors_1.NotFoundError('CV not found');
        }
        cv.status = 'ANALYZING';
        await cv.save();
        try {
            const cvText = await this.cvAnalysisService.extractText(cv.filePath, cv.mimeType);
            let jobDescription = '';
            if (cv.jobId) {
                const job = await Job_model_1.default.findById(cv.jobId);
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
            const candidate = await Candidate_model_1.default.findById(cv.candidateId);
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
                    }
                    else if (analysis.matchScore < 45) {
                        // Low match score (<50%) - Auto reject
                        candidate.status = 'REJECTED';
                    }
                    // Scores between 50-79% remain NEW for manual review
                }
                await candidate.save();
            }
            return cv.save();
        }
        catch (error) {
            cv.status = 'FAILED';
            await cv.save();
            throw error;
        }
    }
    async deleteCV(id) {
        const cv = await CV_model_1.default.findById(id);
        if (!cv) {
            throw new errors_1.NotFoundError('CV not found');
        }
        // Delete file from filesystem
        if (fs_1.default.existsSync(cv.filePath)) {
            fs_1.default.unlinkSync(cv.filePath);
        }
        return CV_model_1.default.findByIdAndDelete(id);
    }
    async downloadCV(id) {
        const cv = await CV_model_1.default.findById(id);
        if (!cv) {
            throw new errors_1.NotFoundError('CV not found');
        }
        if (!fs_1.default.existsSync(cv.filePath)) {
            throw new errors_1.NotFoundError('CV file not found');
        }
        return {
            filePath: cv.filePath,
            fileName: cv.fileName
        };
    }
}
exports.CVsService = CVsService;
//# sourceMappingURL=cvs.service.js.map