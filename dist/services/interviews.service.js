"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewsService = void 0;
const Interview_model_1 = __importDefault(require("../models/Interview.model"));
const Candidate_model_1 = __importDefault(require("../models/Candidate.model"));
const Job_model_1 = __importDefault(require("../models/Job.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class InterviewsService {
    async getInterviews(filters) {
        const { page = 1, limit = 10 } = filters;
        const { skip, limit: limitNum } = (0, helpers_1.paginate)(page, limit);
        const query = {};
        if (filters.candidateId) {
            query.candidateId = filters.candidateId;
        }
        if (filters.jobId) {
            query.jobId = filters.jobId;
        }
        if (filters.interviewerId) {
            query.interviewerId = filters.interviewerId;
        }
        if (filters.status) {
            query.status = filters.status;
        }
        const [interviews, total] = await Promise.all([
            Interview_model_1.default.find(query)
                .skip(skip)
                .limit(limitNum)
                .sort({ date: 1, time: 1 })
                .populate('candidateId', 'name email')
                .populate('jobId', 'title company')
                .populate('interviewerId', 'name email'),
            Interview_model_1.default.countDocuments(query)
        ]);
        return {
            interviews,
            pagination: {
                page,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        };
    }
    async createInterview(data) {
        const candidate = await Candidate_model_1.default.findById(data.candidateId);
        if (!candidate) {
            throw new errors_1.NotFoundError('Candidate not found');
        }
        if (data.jobId) {
            const job = await Job_model_1.default.findById(data.jobId);
            if (!job) {
                throw new errors_1.NotFoundError('Job not found');
            }
        }
        const interviewer = await User_model_1.default.findById(data.interviewerId);
        if (!interviewer) {
            throw new errors_1.NotFoundError('Interviewer not found');
        }
        const interview = new Interview_model_1.default(data);
        return interview.save();
    }
    async getInterviewById(id) {
        const interview = await Interview_model_1.default.findById(id)
            .populate('candidateId', 'name email')
            .populate('jobId', 'title company')
            .populate('interviewerId', 'name email');
        if (!interview) {
            throw new errors_1.NotFoundError('Interview not found');
        }
        return interview;
    }
    async updateInterview(id, data) {
        const interview = await Interview_model_1.default.findById(id);
        if (!interview) {
            throw new errors_1.NotFoundError('Interview not found');
        }
        if (data.candidateId) {
            const candidate = await Candidate_model_1.default.findById(data.candidateId);
            if (!candidate) {
                throw new errors_1.NotFoundError('Candidate not found');
            }
        }
        if (data.jobId) {
            const job = await Job_model_1.default.findById(data.jobId);
            if (!job) {
                throw new errors_1.NotFoundError('Job not found');
            }
        }
        if (data.interviewerId) {
            const interviewer = await User_model_1.default.findById(data.interviewerId);
            if (!interviewer) {
                throw new errors_1.NotFoundError('Interviewer not found');
            }
        }
        Object.assign(interview, data);
        return interview.save();
    }
    async deleteInterview(id) {
        const interview = await Interview_model_1.default.findById(id);
        if (!interview) {
            throw new errors_1.NotFoundError('Interview not found');
        }
        return Interview_model_1.default.findByIdAndDelete(id);
    }
    async getUpcomingInterviews(userId) {
        const query = {
            date: { $gte: new Date() },
            status: 'SCHEDULED'
        };
        if (userId) {
            query.interviewerId = userId;
        }
        const interviews = await Interview_model_1.default.find(query)
            .sort({ date: 1, time: 1 })
            .populate('candidateId', 'name email')
            .populate('jobId', 'title company')
            .populate('interviewerId', 'name email')
            .limit(20);
        return interviews;
    }
}
exports.InterviewsService = InterviewsService;
//# sourceMappingURL=interviews.service.js.map