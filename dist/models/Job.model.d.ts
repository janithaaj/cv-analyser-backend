import mongoose, { Document } from 'mongoose';
export interface IJob extends Document {
    title: string;
    description?: string;
    company: string;
    location: string;
    type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
    status: 'DRAFT' | 'ACTIVE' | 'CLOSED';
    postedDate: Date;
    views: number;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Job.model.d.ts.map