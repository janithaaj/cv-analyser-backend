import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getCandidates: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCandidateById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createCandidate: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCandidate: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCandidateStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteCandidate: (req: AuthRequest, res: Response) => Promise<void>;
export declare const rankCandidates: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCandidateCVs: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=candidates.controller.d.ts.map