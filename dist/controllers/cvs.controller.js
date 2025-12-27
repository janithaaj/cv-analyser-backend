"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadCV = exports.deleteCV = exports.analyzeCV = exports.getCVById = exports.uploadCV = exports.getCVs = void 0;
const cvs_service_1 = require("../services/cvs.service");
const helpers_1 = require("../utils/helpers");
const fs_1 = __importDefault(require("fs"));
const cvsService = new cvs_service_1.CVsService();
const getCVs = async (req, res) => {
    try {
        const { jobId, candidateId, status, page, limit } = req.query;
        const cvs = await cvsService.getCVs({
            jobId: jobId,
            candidateId: candidateId,
            status: status,
            page: Number(page) || 1,
            limit: Number(limit) || 10
        });
        res.json((0, helpers_1.formatResponse)(cvs));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getCVs = getCVs;
const uploadCV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json((0, helpers_1.formatError)('No file uploaded'));
        }
        const { candidateId, jobId } = req.body;
        if (!candidateId) {
            return res.status(400).json((0, helpers_1.formatError)('Candidate ID is required'));
        }
        const cv = await cvsService.uploadCV(req.file, candidateId, jobId);
        res.status(201).json((0, helpers_1.formatResponse)(cv, 'CV uploaded successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.uploadCV = uploadCV;
const getCVById = async (req, res) => {
    try {
        const cv = await cvsService.getCVById(req.params.id);
        res.json((0, helpers_1.formatResponse)(cv));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getCVById = getCVById;
const analyzeCV = async (req, res) => {
    try {
        const cv = await cvsService.analyzeCV(req.params.id);
        res.json((0, helpers_1.formatResponse)(cv, 'CV analyzed successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.analyzeCV = analyzeCV;
const deleteCV = async (req, res) => {
    try {
        await cvsService.deleteCV(req.params.id);
        res.json((0, helpers_1.formatResponse)(null, 'CV deleted successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.deleteCV = deleteCV;
const downloadCV = async (req, res) => {
    try {
        const { filePath, fileName } = await cvsService.downloadCV(req.params.id);
        if (!fs_1.default.existsSync(filePath)) {
            return res.status(404).json((0, helpers_1.formatError)('File not found'));
        }
        res.download(filePath, fileName, (err) => {
            if (err) {
                res.status(500).json((0, helpers_1.formatError)('Error downloading file'));
            }
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.downloadCV = downloadCV;
//# sourceMappingURL=cvs.controller.js.map