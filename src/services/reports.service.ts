import Report, { IReport } from '../models/Report.model';
import Job from '../models/Job.model';
import Candidate from '../models/Candidate.model';
import Interview from '../models/Interview.model';
import CV from '../models/CV.model';
import { NotFoundError } from '../utils/errors';
import { paginate } from '../utils/helpers';

export class ReportsService {
  async getReports(filters: {
    userId?: string;
    type?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 10 } = filters;
    const { skip, limit: limitNum } = paginate(page, limit);
    
    const query: any = {};
    
    if (filters.userId) {
      query.userId = filters.userId;
    }
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    const [reports, total] = await Promise.all([
      Report.find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 })
        .populate('userId', 'name email'),
      Report.countDocuments(query)
    ]);
    
    return {
      reports,
      pagination: {
        page,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };
  }

  async generateReport(data: {
    name: string;
    type: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
    userId: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<IReport> {
    const reportData = await this.collectReportData(data.type, data.startDate, data.endDate);

    const report = new Report({
      name: data.name,
      type: data.type,
      data: reportData,
      userId: data.userId
    });

    return report.save();
  }

  async getReportById(id: string): Promise<IReport | null> {
    const report = await Report.findById(id).populate('userId', 'name email');
    if (!report) {
      throw new NotFoundError('Report not found');
    }
    return report;
  }

  async deleteReport(id: string): Promise<IReport | null> {
    const report = await Report.findById(id);
    if (!report) {
      throw new NotFoundError('Report not found');
    }
    return Report.findByIdAndDelete(id);
  }

  private async collectReportData(
    type: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {
    const now = new Date();
    let dateFilter: any = {};

    switch (type) {
      case 'MONTHLY':
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth(), 1),
            $lt: new Date(now.getFullYear(), now.getMonth() + 1, 1)
          }
        };
        break;
      case 'QUARTERLY':
        const quarter = Math.floor(now.getMonth() / 3);
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), quarter * 3, 1),
            $lt: new Date(now.getFullYear(), (quarter + 1) * 3, 1)
          }
        };
        break;
      case 'YEARLY':
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), 0, 1),
            $lt: new Date(now.getFullYear() + 1, 0, 1)
          }
        };
        break;
      case 'CUSTOM':
        if (startDate && endDate) {
          dateFilter = {
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          };
        }
        break;
    }

    const [totalJobs, activeJobs, totalCandidates, totalCVs, totalInterviews] = await Promise.all([
      Job.countDocuments(dateFilter),
      Job.countDocuments({ ...dateFilter, status: 'ACTIVE' }),
      Candidate.countDocuments(dateFilter),
      CV.countDocuments(dateFilter),
      Interview.countDocuments(dateFilter)
    ]);

    const candidatesByStatus = await Candidate.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const interviewsByStatus = await Interview.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    return {
      summary: {
        totalJobs,
        activeJobs,
        totalCandidates,
        totalCVs,
        totalInterviews
      },
      candidatesByStatus,
      interviewsByStatus,
      period: {
        type,
        startDate: dateFilter.createdAt?.$gte || null,
        endDate: dateFilter.createdAt?.$lt || dateFilter.createdAt?.$lte || null
      }
    };
  }
}

