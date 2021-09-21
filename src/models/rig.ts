import * as mongoose from 'mongoose';

export class Rig {
    designId: string;
    userId: string;
    highPumpPressure: number;
    lowPumpPressure: number;
    flowRateHighPumpPressure: number;
    flowRateLowPumpPressure: number;
    flowExponent: number;
    pumpEfficiency: number;
    maxAllowableSurfacePressure: number;
    maxHorsePower: number;
    minimumFlowRate: number;
    surfaceSystemConstant: number;

  }


export interface RigDocument extends mongoose.Document, Rig { }

export const RigSchema = new mongoose.Schema({
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    highPumpPressure: {type: Number, required: true },
    lowPumpPressure: {type: Number, required: true },
    flowRateHighPumpPressure: {type: Number, required: true },
    flowRateLowPumpPressure: {type: Number, required: true },
    flowExponent: {type: Number, required: true },
    pumpEfficiency: {type: Number, required: true },
    maxAllowableSurfacePressure: {type: Number, required: true },
    maxHorsePower: {type: Number, required: true },
    minimumFlowRate: {type: Number, required: true },
    surfaceSystemConstant: {type: Number, required: true },
  
  });

