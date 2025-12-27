import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ICandidate, {}, {}, {}, mongoose.Document<unknown, {}, ICandidate, {}, {}> & ICandidate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Candidate.model.d.ts.map