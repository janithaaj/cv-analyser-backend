import mongoose, { Document } from 'mongoose';
export interface IInterview extends Document {
    candidateId: mongoose.Types.ObjectId;
    jobId?: mongoose.Types.ObjectId;
    interviewerId: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    duration: number;
    type: 'VIDEO_CALL' | 'IN_PERSON' | 'PHONE';
    location: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IInterview, {}, {}, {}, mongoose.Document<unknown, {}, IInterview, {}, {}> & IInterview & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Interview.model.d.ts.map