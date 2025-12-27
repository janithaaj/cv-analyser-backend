"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobStats = exports.deleteJob = exports.updateJob = exports.getJobById = exports.createJob = exports.getJobs = void 0;
const jobs_service_1 = require("../services/jobs.service");
const helpers_1 = require("../utils/helpers");
const jobsService = new jobs_service_1.JobsService();
const getJobs = async (req, res) => {
    try {
        const { status, search, page, limit } = req.query;
        const jobs = await jobsService.getJobs({
            status: status,
            search: search,
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            userId: req.user?.userId
        });
        res.json((0, helpers_1.formatResponse)(jobs));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getJobs = getJobs;
const createJob = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        const job = await jobsService.createJob({
            ...req.body,
            userId: req.user.userId
        });
        res.status(201).json((0, helpers_1.formatResponse)(job, 'Job created successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.createJob = createJob;
const getJobById = async (req, res) => {
    try {
        const job = await jobsService.getJobById(req.params.id);
        res.json((0, helpers_1.formatResponse)(job));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getJobById = getJobById;
const updateJob = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        const job = await jobsService.updateJob(req.params.id, req.body, req.user.userId);
        res.json((0, helpers_1.formatResponse)(job, 'Job updated successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        await jobsService.deleteJob(req.params.id, req.user.userId);
        res.json((0, helpers_1.formatResponse)(null, 'Job deleted successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.deleteJob = deleteJob;
const getJobStats = async (req, res) => {
    try {
        const stats = await jobsService.getJobStats(req.params.id);
        res.json((0, helpers_1.formatResponse)(stats));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getJobStats = getJobStats;
//# sourceMappingURL=jobs.controller.js.map