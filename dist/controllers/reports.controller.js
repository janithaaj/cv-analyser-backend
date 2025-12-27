"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReport = exports.getReportById = exports.generateReport = exports.getReports = void 0;
const reports_service_1 = require("../services/reports.service");
const helpers_1 = require("../utils/helpers");
const reportsService = new reports_service_1.ReportsService();
const getReports = async (req, res) => {
    try {
        const { type, page, limit } = req.query;
        const reports = await reportsService.getReports({
            userId: req.user?.userId,
            type: type,
            page: Number(page) || 1,
            limit: Number(limit) || 10
        });
        res.json((0, helpers_1.formatResponse)(reports));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getReports = getReports;
const generateReport = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json((0, helpers_1.formatError)('Unauthorized'));
        }
        const { name, type, startDate, endDate } = req.body;
        if (!name || !type) {
            return res.status(400).json((0, helpers_1.formatError)('Name and type are required'));
        }
        const report = await reportsService.generateReport({
            name,
            type,
            userId: req.user.userId,
            startDate: startDate ? new Date(startDate) : undefined,
            endDate: endDate ? new Date(endDate) : undefined
        });
        res.status(201).json((0, helpers_1.formatResponse)(report, 'Report generated successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.generateReport = generateReport;
const getReportById = async (req, res) => {
    try {
        const report = await reportsService.getReportById(req.params.id);
        res.json((0, helpers_1.formatResponse)(report));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.getReportById = getReportById;
const deleteReport = async (req, res) => {
    try {
        await reportsService.deleteReport(req.params.id);
        res.json((0, helpers_1.formatResponse)(null, 'Report deleted successfully'));
    }
    catch (error) {
        res.status(error.statusCode || 500).json((0, helpers_1.formatError)(error.message));
    }
};
exports.deleteReport = deleteReport;
//# sourceMappingURL=reports.controller.js.map