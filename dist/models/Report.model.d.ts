import mongoose, { Document } from 'mongoose';
export interface IReport extends Document {
    name: string;
    type: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
    data: any;
    filePath?: string;
    userId: mongoose.Types.ObjectId;
    generatedAt: Date;
    createdAt: Date;
}
declare const _default: mongoose.Model<IReport, {}, {}, {}, mongoose.Document<unknown, {}, IReport, {}, {}> & IReport & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Report.model.d.ts.map