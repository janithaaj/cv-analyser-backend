import { IJob } from '../models/Job.model';
export declare class JobsService {
    getJobs(filters: {
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
        userId?: string;
    }): Promise<{
        jobs: (import("mongoose").Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
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
    createJob(data: any): Promise<IJob>;
    getJobById(id: string): Promise<IJob | null>;
    updateJob(id: string, data: any, userId: string): Promise<IJob | null>;
    deleteJob(id: string, userId: string): Promise<IJob | null>;
    getJobStats(id: string): Promise<any>;
}
//# sourceMappingURL=jobs.service.d.ts.map