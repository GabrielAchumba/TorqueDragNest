import * as mongoose from 'mongoose';

export class Common {
    commonName: string;
    activeFluid: string;
    startMeasuredDepth: number;
    endMeasuredDepth: number;
    stepSize: number;
    seaWaterDensity: number;
    courseLength: number;
    youngsModulus: number;
    designId: string;
    blockWeight: number;
    percentOfYield: number;
    bucklingLimitFactor: number;
    userId: string;


  }

export interface CommonDocument extends mongoose.Document, Common { }

export const CommonSchema = new mongoose.Schema({
    commonName: {type: String, required: true },
    activeFluid: {type: String, required: false },
    startMeasuredDepth: {type: Number, required: true },
    endMeasuredDepth: {type: Number, required: true },
    stepSize: {type: Number, required: true },
    seaWaterDensity: {type: Number, required: true },
    courseLength: {type: Number, required: true },
    youngsModulus: {type: Number, required: true },
    designId: {type: String, required: true },
    blockWeight: {type: Number, required: true },
    percentOfYield: {type: Number, required: true },
    bucklingLimitFactor: {type: Number, required: true },
    userId: {type: String, required: true },
  
  });
