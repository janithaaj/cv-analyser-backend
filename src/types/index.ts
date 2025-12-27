import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload & {
    userId: string;
    email: string;
  };
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface FilterQuery {
  status?: string;
  search?: string;
  jobId?: string;
  candidateId?: string;
}

