import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class Operation extends BaseModel {
    isTrippingInChecked: boolean;
    trippingInSpeed: number;
    trippingInRPM: number;
    isTrippingOutChecked: boolean;
    trippingOutSpeed: number;
    trippingOutRPM: number;
    isRotatingOnBottomChecked: boolean;
    isSlideDrillingChecked: boolean;
    weightOnBit: number;
    torqueAtBit: number;
    torqueAtBitDrillingOperation: number;
    torqueAtBitBackReaming: number;
    overpullBackReaming: number;
    isBackReamingChecked: boolean;
    isRotatingOffBottomChecked: boolean;
    isUserDefinedOperationsChecked: boolean;
    isHookLoad: boolean;
    isWeightOnBit: boolean;
    isIDHMTrippingInChecked: boolean;
    weightOnBitIDHM: number;
    hookLoadIDHM: number;
    isIDHMTrippingOutChecked: boolean;
    isIDHMRotatingChecked: boolean;
    trippingInSpeedSlideDrlg: number;
    trippingInRPMSlideDrlg: number;
    trippingInSpeedBackReam: number;
    trippingInRPMBackReam: number;
    tripSpeedSlideDrlg: number;
    tripRPMSlideDrlg: number;
    tripSpeedBackReam: number;
    tripRPMBackReam: number;
}



export interface OperationDocument extends mongoose.Document, Operation { }

export const OperationSchema = new mongoose.Schema({
    isTrippingInChecked:{type: Boolean, required: false },
    trippingInSpeed: {type: Number, required: false },
    trippingInRPM: {type: Number, required: false },
    isTrippingOutChecked: {type: Boolean, required: false },
    trippingOutSpeed: {type: Number, required: false },
    trippingOutRPM: {type: Number, required: false },
    isRotatingOnBottomChecked: {type: Boolean, required: false },
    isSlideDrillingChecked: {type: Boolean, required: false },
    weightOnBit: {type: Number, required: false },
    torqueAtBit: {type: Number, required: false },
    torqueAtBitDrillingOperation: {type: Number, required: false },
    torqueAtBitBackReaming: {type: Number, required: false },
    overpullBackReaming: {type: Number, required: false },
    isBackReamingChecked: {type: Boolean, required: false },
    isRotatingOffBottomChecked: {type: Boolean, required: false },
    isUserDefinedOperationsChecked: {type: Boolean, required: false },
    isHookLoad: {type: Boolean, required: false },
    isWeightOnBit: {type: Boolean, required: false },
    isIDHMTrippingInChecked: {type: Boolean, required: false },
    weightOnBitIDHM:{type: Number, required: false },
    hookLoadIDHM: {type: Number, required: false },
    isIDHMTrippingOutChecked: {type: Boolean, required: false },
    isIDHMRotatingChecked: {type: Boolean, required: false },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    trippingInSpeedSlideDrlg: {type: Number, required: false },
    trippingInRPMSlideDrlg:{type: Number, required: false },
    trippingInSpeedBackReam: {type: Number, required: false },
    trippingInRPMBackReam: {type: Number, required: false },
    tripSpeedSlideDrlg: {type: Number, required: false },
    tripRPMSlideDrlg: {type: Number, required: false },
    tripSpeedBackReam: {type: Number, required: false },
    tripRPMBackReam: {type: Number, required: false },
  
  });
