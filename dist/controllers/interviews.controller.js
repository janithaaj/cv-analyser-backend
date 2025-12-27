"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingInterviews = exports.deleteInterview = exports.updateInterview = exports.getInterviewById = exports.createInterview = exports.getInterviews = void 0;
const interviews_service_1 = require("../services/interviews.service");
const helpers_1 = require("../utils/helpers");
const interviewsService = new interviews_service_1.InterviewsService();
const getInterviews = async (req, res) => {
    try {
        const { candidateId, jobId, interviewerId, status, page, limit } = req.query;
        const interviews = await interviewsService.getInterviews({
            candidateId: candidateId,
            jobId: jobId,
            interviewerId: interviewerId,
            status: status,
            page: Number(page) || 1,
            limit: Number(limit) || 10
        });
        res.json((0, helpers_1.formatResponse)(interviews));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getInterviews = getInterviews;
const createInterview = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        const interview = await interviewsService.createInterview({
            ...req.body,
            interviewerId: req.body.interviewerId || req.user.userId
        });
        res.status(201).json((0, helpers_1.formatResponse)(interview, 'Interview scheduled successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.createInterview = createInterview;
const getInterviewById = async (req, res) => {
    try {
        const interview = await interviewsService.getInterviewById(req.params.id);
        res.json((0, helpers_1.formatResponse)(interview));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getInterviewById = getInterviewById;
const updateInterview = async (req, res) => {
    try {
        const interview = await interviewsService.updateInterview(req.params.id, req.body);
        res.json((0, helpers_1.formatResponse)(interview, 'Interview updated successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.updateInterview = updateInterview;
const deleteInterview = async (req, res) => {
    try {
        await interviewsService.deleteInterview(req.params.id);
        res.json((0, helpers_1.formatResponse)(null, 'Interview cancelled successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.deleteInterview = deleteInterview;
const getUpcomingInterviews = async (req, res) => {
    try {
        const interviews = await interviewsService.getUpcomingInterviews(req.user?.userId);
        res.json((0, helpers_1.formatResponse)(interviews));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getUpcomingInterviews = getUpcomingInterviews;
//# sourceMappingURL=interviews.controller.js.map