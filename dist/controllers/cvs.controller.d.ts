import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getCVs: (req: AuthRequest, res: Response) => Promise<void>;
export declare const uploadCV: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCVById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const analyzeCV: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteCV: (req: AuthRequest, res: Response) => Promise<void>;
export declare const downloadCV: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cvs.controller.d.ts.map