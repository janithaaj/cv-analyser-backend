import { IInterview } from '../models/Interview.model';
export declare class InterviewsService {
    getInterviews(filters: {
        candidateId?: string;
        jobId?: string;
        interviewerId?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        interviews: (import("mongoose").Document<unknown, {}, IInterview, {}, {}> & IInterview & Required<{
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
    createInterview(data: any): Promise<IInterview>;
    getInterviewById(id: string): Promise<IInterview | null>;
    updateInterview(id: string, data: any): Promise<IInterview | null>;
    deleteInterview(id: string): Promise<IInterview | null>;
    getUpcomingInterviews(userId?: string): Promise<IInterview[]>;
}
//# sourceMappingURL=interviews.service.d.ts.map