import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  candidateId: mongoose.Types.ObjectId;
  jobId?: mongoose.Types.ObjectId;
  interviewerId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  duration: number; // in minutes
  type: 'VIDEO_CALL' | 'IN_PERSON' | 'PHONE';
  location: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<IInterview>({
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  interviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  type: {
    type: String,
    enum: ['VIDEO_CALL', 'IN_PERSON', 'PHONE'],
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'],
    default: 'SCHEDULED'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IInterview>('Interview', InterviewSchema);

