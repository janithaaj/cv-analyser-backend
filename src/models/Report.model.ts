import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  name: string;
  type: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
  data: any;
  filePath?: string;
  userId: mongoose.Types.ObjectId;
  generatedAt: Date;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['MONTHLY', 'QUARTERLY', 'YEARLY', 'CUSTOM'],
    required: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  filePath: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model<IReport>('Report', ReportSchema);

