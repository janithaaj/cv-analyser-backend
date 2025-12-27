import { Response } from 'express';
import { AuthRequest } from '../types';
import { JobsService } from '../services/jobs.service';
import { formatResponse, formatError } from '../utils/helpers';

const jobsService = new JobsService();

export const getJobs = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search, page, limit } = req.query;
    const jobs = await jobsService.getJobs({
      status: status as string,
      search: search as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      userId: req.user?.userId
    });
    res.json(formatResponse(jobs));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    const job = await jobsService.createJob({
      ...req.body,
      userId: req.user.userId
    });
    res.status(201).json(formatResponse(job, 'Job created successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getJobById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await jobsService.getJobById(req.params.id);
    res.json(formatResponse(job));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const updateJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    const job = await jobsService.updateJob(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.json(formatResponse(job, 'Job updated successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const deleteJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    await jobsService.deleteJob(req.params.id, req.user.userId);
    res.json(formatResponse(null, 'Job deleted successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getJobStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await jobsService.getJobStats(req.params.id);
    res.json(formatResponse(stats));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

