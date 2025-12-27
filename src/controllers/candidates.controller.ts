import { Response } from 'express';
import { AuthRequest } from '../types';
import { CandidatesService } from '../services/candidates.service';
import { formatResponse, formatError } from '../utils/helpers';

const candidatesService = new CandidatesService();

export const getCandidates = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId, status, search, page, limit } = req.query;
    const candidates = await candidatesService.getCandidates({
      jobId: jobId as string,
      status: status as string,
      search: search as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    res.json(formatResponse(candidates));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getCandidateById = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await candidatesService.getCandidateById(req.params.id);
    res.json(formatResponse(candidate));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const createCandidate = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await candidatesService.createCandidate(req.body);
    res.status(201).json(formatResponse(candidate, 'Candidate created successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const updateCandidate = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await candidatesService.updateCandidate(req.params.id, req.body);
    res.json(formatResponse(candidate, 'Candidate updated successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const updateCandidateStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json(formatError('Status is required'));
    }
    const candidate = await candidatesService.updateCandidateStatus(req.params.id, status);
    res.json(formatResponse(candidate, 'Candidate status updated successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const deleteCandidate = async (req: AuthRequest, res: Response) => {
  try {
    await candidatesService.deleteCandidate(req.params.id);
    res.json(formatResponse(null, 'Candidate deleted successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const rankCandidates = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.body;
    if (!jobId) {
      return res.status(400).json(formatError('Job ID is required'));
    }
    const candidates = await candidatesService.rankCandidates(jobId);
    res.json(formatResponse(candidates));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getCandidateCVs = async (req: AuthRequest, res: Response) => {
  try {
    const cvs = await candidatesService.getCandidateCVs(req.params.id);
    res.json(formatResponse(cvs));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

