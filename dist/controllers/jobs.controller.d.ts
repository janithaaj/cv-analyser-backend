import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getJobs: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getJobById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getJobStats: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=jobs.controller.d.ts.map