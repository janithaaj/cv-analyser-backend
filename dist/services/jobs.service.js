"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const Job_model_1 = __importDefault(require("../models/Job.model"));
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class JobsService {
    async getJobs(filters) {
        const { page = 1, limit = 10 } = filters;
        const { skip, limit: limitNum } = (0, helpers_1.paginate)(page, limit);
        const query = {};
        if (filters.userId) {
            query.userId = filters.userId;
        }
        if (filters.status) {
            query.status = filters.status;
        }
        if (filters.search) {
            query.$or = [
                { title: { $regex: filters.search, $options: 'i' } },
                { company: { $regex: filters.search, $options: 'i' } },
                { description: { $regex: filters.search, $options: 'i' } }
            ];
        }
        const [jobs, total] = await Promise.all([
            Job_model_1.default.find(query)
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 })
                .populate('userId', 'name email'),
            Job_model_1.default.countDocuments(query)
        ]);
        return {
            jobs,
            pagination: {
                page,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        };
    }
    async createJob(data) {
        const job = new Job_model_1.default(data);
        return job.save();
    }
    async getJobById(id) {
        const job = await Job_model_1.default.findById(id).populate('userId', 'name email');
        if (!job) {
            throw new errors_1.NotFoundError('Job not found');
        }
        return job;
    }
    async updateJob(id, data, userId) {
        const job = await Job_model_1.default.findOne({ _id: id, userId });
        if (!job) {
            throw new errors_1.NotFoundError('Job not found');
        }
        Object.assign(job, data);
        return job.save();
    }
    async deleteJob(id, userId) {
        const job = await Job_model_1.default.findOneAndDelete({ _id: id, userId });
        if (!job) {
            throw new errors_1.NotFoundError('Job not found');
        }
        return job;
    }
    async getJobStats(id) {
        const job = await Job_model_1.default.findById(id);
        if (!job) {
            throw new errors_1.NotFoundError('Job not found');
        }
        // This would typically aggregate data from candidates, CVs, interviews
        // For now, returning basic stats
        return {
            views: job.views,
            status: job.status,
            postedDate: job.postedDate
        };
    }
}
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map