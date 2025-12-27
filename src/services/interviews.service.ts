import Interview, { IInterview } from '../models/Interview.model';
import Candidate from '../models/Candidate.model';
import Job from '../models/Job.model';
import User from '../models/User.model';
import { NotFoundError } from '../utils/errors';
import { paginate } from '../utils/helpers';

export class InterviewsService {
  async getInterviews(filters: {
    candidateId?: string;
    jobId?: string;
    interviewerId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 10 } = filters;
    const { skip, limit: limitNum } = paginate(page, limit);
    
    const query: any = {};
    
    if (filters.candidateId) {
      query.candidateId = filters.candidateId;
    }
    
    if (filters.jobId) {
      query.jobId = filters.jobId;
    }
    
    if (filters.interviewerId) {
      query.interviewerId = filters.interviewerId;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    const [interviews, total] = await Promise.all([
      Interview.find(query)
        .skip(skip)
        .limit(limitNum)
        .sort({ date: 1, time: 1 })
        .populate('candidateId', 'name email')
        .populate('jobId', 'title company')
        .populate('interviewerId', 'name email'),
      Interview.countDocuments(query)
    ]);
    
    return {
      interviews,
      pagination: {
        page,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    };
  }

  async createInterview(data: any): Promise<IInterview> {
    const candidate = await Candidate.findById(data.candidateId);
    if (!candidate) {
      throw new NotFoundError('Candidate not found');
    }

    if (data.jobId) {
      const job = await Job.findById(data.jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }
    }

    const interviewer = await User.findById(data.interviewerId);
    if (!interviewer) {
      throw new NotFoundError('Interviewer not found');
    }

    const interview = new Interview(data);
    return interview.save();
  }

  async getInterviewById(id: string): Promise<IInterview | null> {
    const interview = await Interview.findById(id)
      .populate('candidateId', 'name email')
      .populate('jobId', 'title company')
      .populate('interviewerId', 'name email');
    
    if (!interview) {
      throw new NotFoundError('Interview not found');
    }
    
    return interview;
  }

  async updateInterview(id: string, data: any): Promise<IInterview | null> {
    const interview = await Interview.findById(id);
    if (!interview) {
      throw new NotFoundError('Interview not found');
    }

    if (data.candidateId) {
      const candidate = await Candidate.findById(data.candidateId);
      if (!candidate) {
        throw new NotFoundError('Candidate not found');
      }
    }

    if (data.jobId) {
      const job = await Job.findById(data.jobId);
      if (!job) {
        throw new NotFoundError('Job not found');
      }
    }

    if (data.interviewerId) {
      const interviewer = await User.findById(data.interviewerId);
      if (!interviewer) {
        throw new NotFoundError('Interviewer not found');
      }
    }

    Object.assign(interview, data);
    return interview.save();
  }

  async deleteInterview(id: string): Promise<IInterview | null> {
    const interview = await Interview.findById(id);
    if (!interview) {
      throw new NotFoundError('Interview not found');
    }
    return Interview.findByIdAndDelete(id);
  }

  async getUpcomingInterviews(userId?: string): Promise<IInterview[]> {
    const query: any = {
      date: { $gte: new Date() },
      status: 'SCHEDULED'
    };

    if (userId) {
      query.interviewerId = userId;
    }

    const interviews = await Interview.find(query)
      .sort({ date: 1, time: 1 })
      .populate('candidateId', 'name email')
      .populate('jobId', 'title company')
      .populate('interviewerId', 'name email')
      .limit(20);

    return interviews;
  }
}

