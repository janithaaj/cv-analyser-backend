import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getInterviews: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createInterview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getInterviewById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateInterview: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteInterview: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUpcomingInterviews: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=interviews.controller.d.ts.map