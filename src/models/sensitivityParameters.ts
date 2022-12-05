import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class SensitivityParameters extends BaseModel {
    isTDSensitivity: boolean;
    trippingIn_1: string;
    trippingIn_2: string;
    trippingOut_1: string;
    trippingOut_2: string;
    drilling_1: string;
    drilling_2: string;
    slideDrilling_1: string;
    slideDrilling_2: string;
    backReaming_1: string;
    backReaming_2: string;
    rotatingOffBottom_1: string;
    rotatingOffBottom_2: string;
  }

export interface SensitivityParametersDocument extends mongoose.Document, SensitivityParameters { }

export const SensitivityParametersSchema = new mongoose.Schema({
    isTDSensitivity: {type: Boolean, required: false },
    trippingIn_1: {type: String, required: false },
    trippingIn_2: {type: String, required: false },
    trippingOut_1:  {type: String, required: false },
    trippingOut_2:  {type: String, required: false },
    drilling_1:  {type: String, required: false },
    drilling_2:  {type: String, required: false },
    slideDrilling_1:  {type: String, required: false },
    slideDrilling_2:  {type: String, required: false },
    backReaming_1:  {type: String, required: false },
    backReaming_2: {type: String, required: false },
    rotatingOffBottom_1:  {type: String, required: false },
    rotatingOffBottom_2:  {type: String, required: false },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
