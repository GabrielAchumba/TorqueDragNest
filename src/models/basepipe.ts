import * as mongoose from 'mongoose';

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
    _isSelected: boolean;
    youngsModulus: number;
    absoluteRoughness: number;
  }


  export class BasePipe {
    designId: string;
    userId: string;
    pipes: BasePipeModel[];
  }

export interface BasePipeDocument extends mongoose.Document, BasePipe { }

export const BasePipeSchema = new mongoose.Schema({
  designId: {type: String, required: true },
  userId: {type: String, required: true },
  mudPVTs: [{
    typeOfSection: {type: String, required: true },
    length: {type: Number, required: true },
    measuredDepth: {type: Number, required: true },
    size: {type: Number, required: true },
    weight: {type: Number, required: true },
    grade: {type: String, required: true },
    outerDiameter: {type: Number, required: true },
    innerDiameter: {type: Number, required: true },
    minimumYieldStrength: {type: Number, required: true },
    itemDescription: {type: String, required: true },
    makeUpTorque: {type: Number, required: true },
    overPullMargin: {type: Number, required: true },
    _isSelected: {type: Boolean, required: true },
    youngsModulus: {type: Number, required: true },
    absoluteRoughness: {type: Number, required: true },
  }]
  
  });
