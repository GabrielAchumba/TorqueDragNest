import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class DrillBit extends BaseModel {
    bitSize: number;
    numberOfBitNozzles: number;
    dischargeCoefficient: number;
  }

export interface DrillBitDocument extends mongoose.Document, DrillBit { }

export const DrillBitSchema = new mongoose.Schema({
    bitSize: {type: Number, required: true },
    numberOfBitNozzles: {type: Number, required: false },
    dischargeCoefficient: {type: Number, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
