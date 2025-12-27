import { ICV } from '../models/CV.model';
export declare class CVsService {
    private cvAnalysisService;
    constructor();
    getCVs(filters: {
        jobId?: string;
        candidateId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        cvs: (import("mongoose").Document<unknown, {}, ICV, {}, {}> & ICV & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }>;
    uploadCV(file: Express.Multer.File, candidateId: string, jobId?: string): Promise<ICV>;
    getCVById(id: string): Promise<ICV | null>;
    analyzeCV(id: string): Promise<ICV>;
    deleteCV(id: string): Promise<ICV | null>;
    downloadCV(id: string): Promise<{
        filePath: string;
        fileName: string;
    }>;
}
//# sourceMappingURL=cvs.service.d.ts.map