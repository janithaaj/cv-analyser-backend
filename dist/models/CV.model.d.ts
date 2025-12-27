import mongoose, { Document } from 'mongoose';
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
declare const _default: mongoose.Model<ICV, {}, {}, {}, mongoose.Document<unknown, {}, ICV, {}, {}> & ICV & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=CV.model.d.ts.map