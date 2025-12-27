import mongoose, { Schema, Document } from 'mongoose';

export interface ICV extends Document {
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  status: 'UPLOADED' | 'ANALYZING' | 'ANALYZED' | 'FAILED';
  matchScore?: number;
  jobId?: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  analysisData?: any;
  uploadedAt: Date;
  analyzedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CVSchema = new Schema<ICV>({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['UPLOADED', 'ANALYZING', 'ANALYZED', 'FAILED'],
    default: 'UPLOADED'
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  candidateId: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  analysisData: {
    type: Schema.Types.Mixed
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  analyzedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model<ICV>('CV', CVSchema);

