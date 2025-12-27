import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getReports: (req: AuthRequest, res: Response) => Promise<void>;
export declare const generateReport: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getReportById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteReport: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=reports.controller.d.ts.map