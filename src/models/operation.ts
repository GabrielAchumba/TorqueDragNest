import * as mongoose from 'mongoose';

export class Operation {
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
    designId: string;
    userId: string;
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
    isTrippingInChecked:{type: Boolean, required: true },
    trippingInSpeed: {type: Number, required: true },
    trippingInRPM: {type: Number, required: true },
    isTrippingOutChecked: {type: Boolean, required: true },
    trippingOutSpeed: {type: Number, required: true },
    trippingOutRPM: {type: Number, required: true },
    isRotatingOnBottomChecked: {type: Boolean, required: true },
    isSlideDrillingChecked: {type: Boolean, required: true },
    weightOnBit: {type: Number, required: true },
    torqueAtBit: {type: Number, required: true },
    torqueAtBitDrillingOperation: {type: Number, required: true },
    torqueAtBitBackReaming: {type: Number, required: true },
    overpullBackReaming: {type: Number, required: true },
    isBackReamingChecked: {type: Boolean, required: true },
    isRotatingOffBottomChecked: {type: Boolean, required: true },
    isUserDefinedOperationsChecked: {type: Boolean, required: true },
    isHookLoad: {type: Boolean, required: true },
    isWeightOnBit: {type: Boolean, required: true },
    isIDHMTrippingInChecked: {type: Boolean, required: true },
    weightOnBitIDHM:{type: Number, required: true },
    hookLoadIDHM: {type: Number, required: true },
    isIDHMTrippingOutChecked: {type: Boolean, required: true },
    isIDHMRotatingChecked: {type: Boolean, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    trippingInSpeedSlideDrlg: {type: Number, required: true },
    trippingInRPMSlideDrlg:{type: Number, required: true },
    trippingInSpeedBackReam: {type: Number, required: true },
    trippingInRPMBackReam: {type: Number, required: true },
    tripSpeedSlideDrlg: {type: Number, required: true },
    tripRPMSlideDrlg: {type: Number, required: true },
    tripSpeedBackReam: {type: Number, required: true },
    tripRPMBackReam: {type: Number, required: true },
  
  });
