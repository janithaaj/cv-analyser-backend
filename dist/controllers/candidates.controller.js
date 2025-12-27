"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateCVs = exports.rankCandidates = exports.deleteCandidate = exports.updateCandidateStatus = exports.updateCandidate = exports.createCandidate = exports.getCandidateById = exports.getCandidates = void 0;
const candidates_service_1 = require("../services/candidates.service");
const helpers_1 = require("../utils/helpers");
const candidatesService = new candidates_service_1.CandidatesService();
const getCandidates = async (req, res) => {
    try {
        const { jobId, status, search, page, limit } = req.query;
        const candidates = await candidatesService.getCandidates({
            jobId: jobId,
            status: status,
            search: search,
            page: Number(page) || 1,
            limit: Number(limit) || 10
        });
        res.json((0, helpers_1.formatResponse)(candidates));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getCandidates = getCandidates;
const getCandidateById = async (req, res) => {
    try {
        const candidate = await candidatesService.getCandidateById(req.params.id);
        res.json((0, helpers_1.formatResponse)(candidate));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getCandidateById = getCandidateById;
const createCandidate = async (req, res) => {
    try {
        const candidate = await candidatesService.createCandidate(req.body);
        res.status(201).json((0, helpers_1.formatResponse)(candidate, 'Candidate created successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.createCandidate = createCandidate;
const updateCandidate = async (req, res) => {
    try {
        const candidate = await candidatesService.updateCandidate(req.params.id, req.body);
        res.json((0, helpers_1.formatResponse)(candidate, 'Candidate updated successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.updateCandidate = updateCandidate;
const updateCandidateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json((0, helpers_1.formatError)('Status is required'));
        }
        const candidate = await candidatesService.updateCandidateStatus(req.params.id, status);
        res.json((0, helpers_1.formatResponse)(candidate, 'Candidate status updated successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.updateCandidateStatus = updateCandidateStatus;
const deleteCandidate = async (req, res) => {
    try {
        await candidatesService.deleteCandidate(req.params.id);
        res.json((0, helpers_1.formatResponse)(null, 'Candidate deleted successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.deleteCandidate = deleteCandidate;
const rankCandidates = async (req, res) => {
    try {
        const { jobId } = req.body;
        if (!jobId) {
            return res.status(400).json((0, helpers_1.formatError)('Job ID is required'));
        }
        const candidates = await candidatesService.rankCandidates(jobId);
        res.json((0, helpers_1.formatResponse)(candidates));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.rankCandidates = rankCandidates;
const getCandidateCVs = async (req, res) => {
    try {
        const cvs = await candidatesService.getCandidateCVs(req.params.id);
        res.json((0, helpers_1.formatResponse)(cvs));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getCandidateCVs = getCandidateCVs;
//# sourceMappingURL=candidates.controller.js.map