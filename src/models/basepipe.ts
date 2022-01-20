import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class BasePipeModel {
    typeOfSection: string;
    length: number;
    measuredDepth: number;
    size: number;
    weight: number;
    grade: string;
    outerDiameter: number;
    innerDiameter: number;
    minimumYieldStrength: number;
    itemDescription: string;
    makeUpTorque: number;
    overPullMargin: number;
    selected: boolean;
    youngsModulus: number;
    absoluteRoughness: number;
  }


  export interface Pipe extends BasePipeModel
  {
       topTrueVerticalDepth :number
       bottomTrueVerticalDepth :number
       topInclination :number
       bottomInclination :number
       topAzimuth :number
       bottomAzimuth :number
       dogleg :number
       topDisplacement :number
       bottomDisplacement :number
       topOuterDaimeter :number
       averageInclination :number
       averageAzimuth :number
       startMeasuredDepth :number

     /*  public override string ToString()
      {
          return measuredDepth.ToString();
      } */
  }

  export class BasePipe extends BaseModel {
    pipes: BasePipeModel[];
  }

export interface BasePipeDocument extends mongoose.Document, BasePipe { }

export const BasePipeSchema = new mongoose.Schema({
  designId: {type: String, required: true },
  userId: {type: String, required: true },
  pipes: [{
    typeOfSection: {type: String, required: true },
    length: {type: Number, required: true },
    measuredDepth: {type: Number, required: true },
    size: {type: Number, required: false },
    weight: {type: Number, required: true },
    grade: {type: String, required: true },
    outerDiameter: {type: Number, required: true },
    innerDiameter: {type: Number, required: true },
    minimumYieldStrength: {type: Number, required: false },
    itemDescription: {type: String, required: false },
    makeUpTorque: {type: Number, required: false },
    overPullMargin: {type: Number, required: false },
    selected: {type: Boolean, required: false },
    youngsModulus: {type: Number, required: false },
    absoluteRoughness: {type: Number, required: false },
  }]
  
  });
