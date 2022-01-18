import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class Fluid extends BaseModel{
    mudName: string;
    description: string;
    mudBaseType: string;
    baseFluid: string;
    rheologyModel: string;
    rheologyModelType: string;
    fannDialReading: number;
    fannRPM: number;
    baseFannDialReading: number;
    baseFannRPM: number;

  }

export interface FluidDocument extends mongoose.Document, Fluid { }

export const FluidSchema = new mongoose.Schema({
    mudName: {type: String, required: true },
    description: {type: String, required: false },
    mudBaseType: {type: String, required: true },
    baseFluid: {type: String, required: true },
    rheologyModel: {type: String, required: true },
    rheologyModelType: {type: String, required: false },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    fannDialReading: {type: Number, required: true },
    fannRPM: {type: Number, required: true },
    baseFannDialReading: {type: Number, required: true },
    baseFannRPM: {type: Number, required: true },
  
  });

