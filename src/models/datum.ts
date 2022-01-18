import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class Datum extends BaseModel {
    typeOfShore: string;
    datumElevation: number;
    groundElevation: number;
    airGap: number;
    wellHeadElevation: number;
    datumName: string;
  }

export interface DatumDocument extends mongoose.Document, Datum { }

export const DatumSchema = new mongoose.Schema({
    typeOfShore: {type: String, required: true },
    datumElevation: {type: Number, required: false },
    groundElevation: {type: Number, required: true },
    airGap: {type: Number, required: true },
    wellHeadElevation: {type: Number, required: true },
    datumName: {type: String, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
