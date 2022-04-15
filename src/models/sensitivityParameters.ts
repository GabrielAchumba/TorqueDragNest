import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class SensitivityParameters extends BaseModel {
    noOfSensitivities: number;
    isThreeVisible: boolean;
    isFourVisible: boolean;
    isFiveVisible: boolean;
    trippingIn_1: number;
    trippingIn_2: number;
    trippingIn_3: number;
    trippingIn_4: number;
    trippingIn_5: number;
    trippingIn_6: number;
    trippingIn_7: number;
    trippingIn_8: number;
    trippingIn_9: number;
    trippingIn_10: number;
    trippingOut_1: number;
    trippingOut_2: number;
    trippingOut_3: number;
    trippingOut_4: number;
    trippingOut_5: number;
    trippingOut_6: number;
    trippingOut_7: number;
    trippingOut_8: number;
    trippingOut_9: number;
    trippingOut_10: number;
    drilling_1: number;
    drilling_2: number;
    drilling_3: number;
    drilling_4: number;
    drilling_5: number;
    drilling_6: number;
    drilling_7: number;
    drilling_8: number;
    drilling_9: number;
    drilling_10:number;
    slideDrilling_1: number;
    slideDrilling_2: number;
    slideDrilling_3: number;
    slideDrilling_4: number;
    slideDrilling_5: number;
    slideDrilling_6: number;
    slideDrilling_7: number;
    slideDrilling_8: number;
    slideDrilling_9: number;
    slideDrilling_10: number;
    backReaming_1: number;
    backReaming_2: number;
    backReaming_3: number;
    backReaming_4: number;
    backReaming_5: number;
    backReaming_6: number;
    backReaming_7: number;
    backReaming_8: number;
    backReaming_9: number;
    backReaming_10: number;
    rotatingOffBottom_1: number;
    rotatingOffBottom_2: number;
    rotatingOffBottom_3: number;
    rotatingOffBottom_4: number;
    rotatingOffBottom_5: number;
    rotatingOffBottom_6: number;
    rotatingOffBottom_7: number;
    rotatingOffBottom_8: number;
    rotatingOffBottom_9: number;
    rotatingOffBottom_10: number;
  }

export interface SensitivityParametersDocument extends mongoose.Document, SensitivityParameters { }

export const SensitivityParametersSchema = new mongoose.Schema({
    noOfSensitivities: {type: Number, required: false },
    isThreeVisible: {type: Boolean, required: false },
    isFourVisible: {type: Boolean, required: false },
    isFiveVisible: {type: Boolean, required: false },
    trippingIn_1: {type: Number, required: false },
    trippingIn_2: {type: Number, required: false },
    trippingIn_3: {type: Number, required: false },
    trippingIn_4: {type: Number, required: false },
    trippingIn_5: {type: Number, required: false },
    trippingIn_6: {type: Number, required: false },
    trippingIn_7: {type: Number, required: false },
    trippingIn_8: {type: Number, required: false },
    trippingIn_9:  {type: Number, required: false },
    trippingIn_10:  {type: Number, required: false },
    trippingOut_1:  {type: Number, required: false },
    trippingOut_2:  {type: Number, required: false },
    trippingOut_3:  {type: Number, required: false },
    trippingOut_4:  {type: Number, required: false },
    trippingOut_5:  {type: Number, required: false },
    trippingOut_6: {type: Number, required: false },
    trippingOut_7:  {type: Number, required: false },
    trippingOut_8:  {type: Number, required: false },
    trippingOut_9:  {type: Number, required: false },
    trippingOut_10:  {type: Number, required: false },
    drilling_1:  {type: Number, required: false },
    drilling_2:  {type: Number, required: false },
    drilling_3:  {type: Number, required: false },
    drilling_4:  {type: Number, required: false },
    drilling_5:  {type: Number, required: false },
    drilling_6:  {type: Number, required: false },
    drilling_7:  {type: Number, required: false },
    drilling_8:  {type: Number, required: false },
    drilling_9:  {type: Number, required: false },
    drilling_10: {type: Number, required: false },
    slideDrilling_1:  {type: Number, required: false },
    slideDrilling_2:  {type: Number, required: false },
    slideDrilling_3:  {type: Number, required: false },
    slideDrilling_4:  {type: Number, required: false },
    slideDrilling_5:  {type: Number, required: false },
    slideDrilling_6:  {type: Number, required: false },
    slideDrilling_7:  {type: Number, required: false },
    slideDrilling_8:  {type: Number, required: false },
    slideDrilling_9:  {type: Number, required: false },
    slideDrilling_10:  {type: Number, required: false },
    backReaming_1:  {type: Number, required: false },
    backReaming_2: {type: Number, required: false },
    backReaming_3:  {type: Number, required: false },
    backReaming_4:  {type: Number, required: false },
    backReaming_5:  {type: Number, required: false },
    backReaming_6:  {type: Number, required: false },
    backReaming_7:  {type: Number, required: false },
    backReaming_8:  {type: Number, required: false },
    backReaming_9:  {type: Number, required: false },
    backReaming_10:  {type: Number, required: false },
    rotatingOffBottom_1:  {type: Number, required: false },
    rotatingOffBottom_2:  {type: Number, required: false },
    rotatingOffBottom_3:  {type: Number, required: false },
    rotatingOffBottom_4:  {type: Number, required: false },
    rotatingOffBottom_5:  {type: Number, required: false },
    rotatingOffBottom_6:  {type: Number, required: false },
    rotatingOffBottom_7:  {type: Number, required: false },
    rotatingOffBottom_8:  {type: Number, required: false },
    rotatingOffBottom_9:  {type: Number, required: false },
    rotatingOffBottom_10:  {type: Number, required: false },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
