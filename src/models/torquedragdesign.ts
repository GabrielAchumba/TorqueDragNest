import { ClientSession } from 'mongodb';
import * as mongoose from 'mongoose';

export const createUniqueId = (_torqueDragDesign:TorqueDragDesign) => {
    const torqueDragDesign = {..._torqueDragDesign} as TorqueDragDesign;
    const delimeter:string = '@#@';
    torqueDragDesign.uniqueId = torqueDragDesign.externalcompanyName.toLowerCase() + delimeter +
    torqueDragDesign.projectName.toLowerCase() + delimeter +
    torqueDragDesign.siteName.toLowerCase() + delimeter +
    torqueDragDesign.wellName.toLowerCase() + delimeter +
    torqueDragDesign.wellboreName.toLowerCase() + delimeter +
    torqueDragDesign.wellDesignName.toLowerCase() + delimeter +
    torqueDragDesign.designName.toLowerCase() + delimeter +
    torqueDragDesign.userId.toLowerCase();
    return torqueDragDesign;

}

export class TorqueDragDesign  {
    designName: string;
    designDay: number;
    designMonth: number;
    designYear: number;
    projectName: string;
    wellName: string;
    wellboreName: string;
    wellDesignName: string;
    siteName: string;
    externalcompanyName: string;
    uniqueId: string;
    userId: string;
}

export interface TorqueDragDesignWithGuid extends TorqueDragDesign {
    id:string;
    wellCaseId:string;
    createdAt:string;
    designDate:Date;
    isSelected:Boolean;
    companyName:string;
}

export const TorqueDragDesignWithGuidObj:TorqueDragDesignWithGuid = {
    designName: "",
    designDay: 0,
    designMonth: 0,
    designYear: 0,
    projectName: "",
    wellName: "",
    wellboreName: "",
    wellDesignName: "",
    siteName: "",
    externalcompanyName: "",
    uniqueId: "",
    userId: "",
    id: "",
    wellCaseId: "",
    createdAt: "",
    designDate:new Date(),
    isSelected:false,
    companyName:""
};


export interface TorqueDragDesignDocument extends mongoose.Document, TorqueDragDesign  { }

export const TorqueDragDesignSchema = new mongoose.Schema({
    designName: {type: String, required: true },
    designDay: {type: Number, required: true },
    designMonth: {type: Number, required: true },
    designYear: {type: Number, required: true },
    projectName: {type: String, required: true },
    wellName: {type: String, required: true },
    wellboreName: {type: String, required: true },
    wellDesignName: {type: String, required: true },
    siteName: {type: String, required: true },
    externalcompanyName: {type: String, required: true },
    uniqueId: {type: String, required: true },
    userId: {type: String, required: true },
  
  });
