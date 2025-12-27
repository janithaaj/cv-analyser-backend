import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  experience?: string;
  skills: string[];
  matchScore?: number;
  status: 'NEW' | 'SHORTLISTED' | 'INTERVIEWED' | 'OFFERED' | 'HIRED' | 'REJECTED';
  jobId?: mongoose.Types.ObjectId;
  lastContact?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['NEW', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'HIRED', 'REJECTED'],
    default: 'NEW'
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  lastContact: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);

