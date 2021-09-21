import * as mongoose from 'mongoose';

export class BaseHoleSection {
    _isSelected: boolean;
    typeOfHole: string;
    outerDiameter: number;
    innerDiameter: number;
    weight: number;
    topOfHole: string;
    designId: string;
    userId: string;
    bottomOfHole: number;
    frictionFactor: number;
  }


export interface BaseHoleSectionDocument extends mongoose.Document, BaseHoleSection { }

export const BaseHoleSectionchema = new mongoose.Schema({
    isSelected: {type: Boolean, required: true },
    typeOfHole: {type: String, required: false },
    outerDiameter: {type: Number, required: true },
    innerDiameter: {type: Number, required: true },
    weight: {type: Number, required: true },
    topOfHole: {type: String, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    bottomOfHole: {type: Number, required: true },
    frictionFactor: {type: Number, required: true },
  
  });
