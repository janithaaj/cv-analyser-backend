import { Response } from 'express';
import { AuthRequest } from '../types';
import { InterviewsService } from '../services/interviews.service';
import { formatResponse, formatError } from '../utils/helpers';

const interviewsService = new InterviewsService();

export const getInterviews = async (req: AuthRequest, res: Response) => {
  try {
    const { candidateId, jobId, interviewerId, status, page, limit } = req.query;
    const interviews = await interviewsService.getInterviews({
      candidateId: candidateId as string,
      jobId: jobId as string,
      interviewerId: interviewerId as string,
      status: status as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    res.json(formatResponse(interviews));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const createInterview = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json(formatError('Unauthorized'));
    }
    const interview = await interviewsService.createInterview({
      ...req.body,
      interviewerId: req.body.interviewerId || req.user.userId
    });
    res.status(201).json(formatResponse(interview, 'Interview scheduled successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getInterviewById = async (req: AuthRequest, res: Response) => {
  try {
    const interview = await interviewsService.getInterviewById(req.params.id);
    res.json(formatResponse(interview));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const updateInterview = async (req: AuthRequest, res: Response) => {
  try {
    const interview = await interviewsService.updateInterview(req.params.id, req.body);
    res.json(formatResponse(interview, 'Interview updated successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const deleteInterview = async (req: AuthRequest, res: Response) => {
  try {
    await interviewsService.deleteInterview(req.params.id);
    res.json(formatResponse(null, 'Interview cancelled successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getUpcomingInterviews = async (req: AuthRequest, res: Response) => {
  try {
    const interviews = await interviewsService.getUpcomingInterviews(req.user?.userId);
    res.json(formatResponse(interviews));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

