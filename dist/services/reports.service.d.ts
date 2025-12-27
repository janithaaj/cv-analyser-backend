import { IReport } from '../models/Report.model';
export declare class ReportsService {
    getReports(filters: {
        userId?: string;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        reports: (import("mongoose").Document<unknown, {}, IReport, {}, {}> & IReport & Required<{
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
    generateReport(data: {
        name: string;
        type: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
        userId: string;
        startDate?: Date;
        endDate?: Date;
    }): Promise<IReport>;
    getReportById(id: string): Promise<IReport | null>;
    deleteReport(id: string): Promise<IReport | null>;
    private collectReportData;
}
//# sourceMappingURL=reports.service.d.ts.map