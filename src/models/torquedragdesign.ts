import * as mongoose from 'mongoose';

export class TorqueDragDesign  {
    companyId: string;
    designName: number;
    designDay: number;
    designMonth: number;
    designYear: number;
    projectName: string;
    fieldName: string;
    wellName: string;
    wellboreName: string;
    wellDesignName: string;
    siteName: string;
    externalcompanyName: string;
    uniqueId: string;
    designId: string;
    userId: string;
}


export interface TorqueDragDesignDocument extends mongoose.Document, TorqueDragDesign  { }

export const TorqueDragDesignSchema = new mongoose.Schema({
    companyId: {type: String, required: true },
    designName: {type: Number, required: true },
    designDay: {type: Number, required: true },
    designMonth: {type: Number, required: true },
    designYear: {type: Number, required: true },
    projectName: {type: String, required: true },
    fieldName: {type: String, required: true },
    wellName: {type: String, required: true },
    wellboreName: {type: String, required: true },
    wellDesignName: {type: String, required: true },
    siteName: {type: String, required: true },
    externalcompanyName: {type: String, required: true },
    uniqueId: {type: String, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
