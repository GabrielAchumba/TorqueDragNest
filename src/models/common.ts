import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class Common extends BaseModel {
    commonName: string;
    activeFluid: string;
    startMeasuredDepth: number;
    endMeasuredDepth: number;
    stepSize: number;
    seaWaterDensity: number;
    courseLength: number;
    youngsModulus: number;
    blockWeight: number;
    percentOfYield: number;
    bucklingLimitFactor: number;


  }

export interface CommonDocument extends mongoose.Document, Common { }

export const CommonSchema = new mongoose.Schema({
    commonName: {type: String, required: false },
    activeFluid: {type: String, required: false },
    startMeasuredDepth: {type: Number, required: true },
    endMeasuredDepth: {type: Number, required: true },
    stepSize: {type: Number, required: true },
    seaWaterDensity: {type: Number, required: true },
    courseLength: {type: Number, required: false },
    youngsModulus: {type: Number, required: true },
    designId: {type: String, required: true },
    blockWeight: {type: Number, required: true },
    percentOfYield: {type: Number, required: true },
    bucklingLimitFactor: {type: Number, required: true },
    userId: {type: String, required: true },
  
  });
