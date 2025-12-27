"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const Report_model_1 = __importDefault(require("../models/Report.model"));
const Job_model_1 = __importDefault(require("../models/Job.model"));
const Candidate_model_1 = __importDefault(require("../models/Candidate.model"));
const Interview_model_1 = __importDefault(require("../models/Interview.model"));
const CV_model_1 = __importDefault(require("../models/CV.model"));
const errors_1 = require("../utils/errors");
const helpers_1 = require("../utils/helpers");
class ReportsService {
    async getReports(filters) {
        const { page = 1, limit = 10 } = filters;
        const { skip, limit: limitNum } = (0, helpers_1.paginate)(page, limit);
        const query = {};
        if (filters.userId) {
            query.userId = filters.userId;
        }
        if (filters.type) {
            query.type = filters.type;
        }
        const [reports, total] = await Promise.all([
            Report_model_1.default.find(query)
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 })
                .populate('userId', 'name email'),
            Report_model_1.default.countDocuments(query)
        ]);
        return {
            reports,
            pagination: {
                page,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        };
    }
    async generateReport(data) {
        const reportData = await this.collectReportData(data.type, data.startDate, data.endDate);
        const report = new Report_model_1.default({
            name: data.name,
            type: data.type,
            data: reportData,
            userId: data.userId
        });
        return report.save();
    }
    async getReportById(id) {
        const report = await Report_model_1.default.findById(id).populate('userId', 'name email');
        if (!report) {
            throw new errors_1.NotFoundError('Report not found');
        }
        return report;
    }
    async deleteReport(id) {
        const report = await Report_model_1.default.findById(id);
        if (!report) {
            throw new errors_1.NotFoundError('Report not found');
        }
        return Report_model_1.default.findByIdAndDelete(id);
    }
    async collectReportData(type, startDate, endDate) {
        const now = new Date();
        let dateFilter = {};
        switch (type) {
            case 'MONTHLY':
                dateFilter = {
                    createdAt: {
                        $gte: new Date(now.getFullYear(), now.getMonth(), 1),
                        $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
                    }
                };
                break;
            case 'QUARTERLY':
                const quarter = Math.floor(now.getMonth() / 3);
                dateFilter = {
                    createdAt: {
                        $gte: new Date(now.getFullYear(), quarter * 3, 1),
                        $lt: new Date(now.getFullYear(), (quarter + 1) * 3, 1)
                    }
                };
                break;
            case 'YEARLY':
                dateFilter = {
                    createdAt: {
                        $gte: new Date(now.getFullYear(), 0, 1),
                        $lt: new Date(now.getFullYear() + 1, 0, 1)
                    }
                };
                break;
            case 'CUSTOM':
                if (startDate && endDate) {
                    dateFilter = {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    };
                }
                break;
        }
        const [totalJobs, activeJobs, totalCandidates, totalCVs, totalInterviews] = await Promise.all([
            Job_model_1.default.countDocuments(dateFilter),
            Job_model_1.default.countDocuments({ ...dateFilter, status: 'ACTIVE' }),
            Candidate_model_1.default.countDocuments(dateFilter),
            CV_model_1.default.countDocuments(dateFilter),
            Interview_model_1.default.countDocuments(dateFilter)
        ]);
        const candidatesByStatus = await Candidate_model_1.default.aggregate([
            { $match: dateFilter },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const interviewsByStatus = await Interview_model_1.default.aggregate([
            { $match: dateFilter },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        return {
            summary: {
                totalJobs,
                activeJobs,
                totalCandidates,
                totalCVs,
                totalInterviews
            },
            candidatesByStatus,
            interviewsByStatus,
            period: {
                type,
                startDate: dateFilter.createdAt?.$gte || null,
                endDate: dateFilter.createdAt?.$lt || dateFilter.createdAt?.$lte || null
            }
        };
    }
}
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map