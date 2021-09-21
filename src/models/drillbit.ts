import * as mongoose from 'mongoose';

export class DrillBit {
    bitSize: number;
    numberOfBitNozzles: number;
    dischargeCoefficient: number;
    designId: string;
    userId: string;
  }

export interface DrillBitDocument extends mongoose.Document, DrillBit { }

export const DrillBitSchema = new mongoose.Schema({
    bitSize: {type: Number, required: true },
    numberOfBitNozzles: {type: Number, required: false },
    dischargeCoefficient: {type: Number, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
