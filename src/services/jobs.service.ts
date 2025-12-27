import Job, { IJob } from '../models/Job.model';
import { NotFoundError } from '../utils/errors';
import { paginate } from '../utils/helpers';

export class JobsService {
  async getJobs(filters: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    userId?: string;
  }) {
    const { page = 1, limit = 10 } = filters;
    const { skip, limit: limitNum } = paginate(page, limit);
    
    const query: any = {};
    
    if (filters.userId) {
      query.userId = filters.userId;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { company: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    const [jobs, total] = await Promise.all([
      Job.find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ createdAt: -1 })
        .populate('userId', 'name email'),
      Job.countDocuments(query)
    ]);
    
    return {
      jobs,
      pagination: {
        page,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };
  }

  async createJob(data: any): Promise<IJob> {
    const job = new Job(data);
    return job.save();
  }

  async getJobById(id: string): Promise<IJob | null> {
    const job = await Job.findById(id).populate('userId', 'name email');
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    return job;
  }

  async updateJob(id: string, data: any, userId: string): Promise<IJob | null> {
    const job = await Job.findOne({ _id: id, userId });
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    
    Object.assign(job, data);
    return job.save();
  }

  async deleteJob(id: string, userId: string): Promise<IJob | null> {
    const job = await Job.findOneAndDelete({ _id: id, userId });
    if (!job) {
      throw new NotFoundError('Job not found');
    }
    return job;
  }

  async getJobStats(id: string): Promise<any> {
    const job = await Job.findById(id);
    if (!job) {
      throw new NotFoundError('Job not found');
    }

    // This would typically aggregate data from candidates, CVs, interviews
    // For now, returning basic stats
    return {
      views: job.views,
      status: job.status,
      postedDate: job.postedDate
    };
  }
}

