import { ICandidate } from '../models/Candidate.model';
export declare class CandidatesService {
    getCandidates(filters: {
        jobId?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        candidates: (import("mongoose").Document<unknown, {}, ICandidate, {}, {}> & ICandidate & Required<{
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
    getCandidateById(id: string): Promise<ICandidate | null>;
    createCandidate(data: any): Promise<ICandidate>;
    updateCandidate(id: string, data: any): Promise<ICandidate | null>;
    updateCandidateStatus(id: string, status: string): Promise<ICandidate | null>;
    deleteCandidate(id: string): Promise<ICandidate | null>;
    rankCandidates(jobId: string): Promise<ICandidate[]>;
    getCandidateCVs(candidateId: string): Promise<(import("mongoose").Document<unknown, {}, import("../models/CV.model").ICV, {}, {}> & import("../models/CV.model").ICV & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
//# sourceMappingURL=candidates.service.d.ts.map