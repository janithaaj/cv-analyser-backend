"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatesService = void 0;
const Candidate_model_1 = __importDefault(require("../models/Candidate.model"));
const Job_model_1 = __importDefault(require("../models/Job.model"));
const CV_model_1 = __importDefault(require("../models/CV.model"));
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class CandidatesService {
    async getCandidates(filters) {
        const { page = 1, limit = 10 } = filters;
        const { skip, limit: limitNum } = (0, helpers_1.paginate)(page, limit);
        const query = {};
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
            Candidate_model_1.default.find(query)
                .skip(skip)
                .limit(limitNum)
                .sort({ matchScore: -1, createdAt: -1 })
                .populate('jobId', 'title company'),
            Candidate_model_1.default.countDocuments(query)
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
    async getCandidateById(id) {
        const candidate = await Candidate_model_1.default.findById(id).populate('jobId', 'title company');
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        return candidate;
    }
    async createCandidate(data) {
        if (data.jobId) {
            const job = await Job_model_1.default.findById(data.jobId);
            if (!job) {
                throw new errors_1.NotFoundError('Job not found');
            }
        }
        const candidate = new Candidate_model_1.default(data);
        return candidate.save();
    }
    async updateCandidate(id, data) {
        const candidate = await Candidate_model_1.default.findById(id);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        // Validate status if provided
        if (data.status) {
            const validStatuses = ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'];
            if (!validStatuses.includes(data.status)) {
                throw new errors_1.ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
            }
        }
        if (data.jobId) {
            const job = await Job_model_1.default.findById(data.jobId);
            if (!job) {
                throw new errors_1.NotFoundError('Job not found');
            }
        }
        // Update lastContact if status is being changed to INTERVIEWED, OFFERED, or HIRED
        if (data.status && ['INTERVIEWED', 'OFFERED', 'HIRED'].includes(data.status)) {
            data.lastContact = new Date();
        }
        Object.assign(candidate, data);
        return candidate.save();
    }
    async updateCandidateStatus(id, status) {
        const validStatuses = ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'];
        if (!validStatuses.includes(status)) {
            throw new errors_1.ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
        }
        const candidate = await Candidate_model_1.default.findById(id);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        candidate.status = status;
        // Update lastContact for certain status changes
        if (['INTERVIEWED', 'OFFERED', 'HIRED'].includes(status)) {
            candidate.lastContact = new Date();
        }
        return candidate.save();
    }
    async deleteCandidate(id) {
        const candidate = await Candidate_model_1.default.findById(id);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        // Delete associated CVs
        await CV_model_1.default.deleteMany({ candidateId: id });
        return Candidate_model_1.default.findByIdAndDelete(id);
    }
    async rankCandidates(jobId) {
        const job = await Job_model_1.default.findById(jobId);
        if (!job) {
            throw new errors_1.NotFoundError('Job not found');
        }
        const candidates = await Candidate_model_1.default.find({ jobId })
            .sort({ matchScore: -1 })
            .populate('jobId', 'title company');
        return candidates;
    }
    async getCandidateCVs(candidateId) {
        const candidate = await Candidate_model_1.default.findById(candidateId);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        const cvs = await CV_model_1.default.find({ candidateId })
            .sort({ createdAt: -1 })
            .populate('jobId', 'title company');
        return cvs;
    }
}
exports.CandidatesService = CandidatesService;
//# sourceMappingURL=candidates.service.js.map