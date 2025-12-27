import { Response } from 'express';
import { AuthRequest } from '../types';
import { CVsService } from '../services/cvs.service';
import { formatResponse, formatError } from '../utils/helpers';
import path from 'path';
import fs from 'fs';

const cvsService = new CVsService();

export const getCVs = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId, candidateId, status, page, limit } = req.query;
    const cvs = await cvsService.getCVs({
      jobId: jobId as string,
      candidateId: candidateId as string,
      status: status as string,
      page: Number(page) || 1,
      limit: Number(limit) || 10
    });
    res.json(formatResponse(cvs));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const uploadCV = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json(formatError('No file uploaded'));
    }

    const { candidateId, jobId } = req.body;
    if (!candidateId) {
      return res.status(400).json(formatError('Candidate ID is required'));
    }

    const cv = await cvsService.uploadCV(req.file, candidateId, jobId);
    res.status(201).json(formatResponse(cv, 'CV uploaded successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const getCVById = async (req: AuthRequest, res: Response) => {
  try {
    const cv = await cvsService.getCVById(req.params.id);
    res.json(formatResponse(cv));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const analyzeCV = async (req: AuthRequest, res: Response) => {
  try {
    const cv = await cvsService.analyzeCV(req.params.id);
    res.json(formatResponse(cv, 'CV analyzed successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const deleteCV = async (req: AuthRequest, res: Response) => {
  try {
    await cvsService.deleteCV(req.params.id);
    res.json(formatResponse(null, 'CV deleted successfully'));
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

export const downloadCV = async (req: AuthRequest, res: Response) => {
  try {
    const { filePath, fileName } = await cvsService.downloadCV(req.params.id);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json(formatError('File not found'));
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        res.status(500).json(formatError('Error downloading file'));
      }
    });
  } catch (error: any) {
    res.status(error.statusCode || 500).json(formatError(error.message));
  }
};

