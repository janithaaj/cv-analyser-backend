import { Response } from 'express';
import { AuthRequest } from '../types';
import { ReportsService } from '../services/reports.service';
import { formatResponse, formatError } from '../utils/helpers';

const reportsService = new ReportsService();

export const getReports = async (req: AuthRequest, res: Response) => {
  try {
    const { type, page, limit } = req.query;
    const reports = await reportsService.getReports({
      userId: req.user?.userId,
      type: type as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    res.json(formatResponse(reports));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const generateReport = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    const { name, type, startDate, endDate } = req.body;
    if (!name || !type) {
      return res.status(400).json(formatError('Name and type are required'));
    }
    const report = await reportsService.generateReport({
      name,
      type,
      userId: req.user.userId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    });
    res.status(201).json(formatResponse(report, 'Report generated successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getReportById = async (req: AuthRequest, res: Response) => {
  try {
    const report = await reportsService.getReportById(req.params.id);
    res.json(formatResponse(report));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const deleteReport = async (req: AuthRequest, res: Response) => {
  try {
    await reportsService.deleteReport(req.params.id);
    res.json(formatResponse(null, 'Report deleted successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

