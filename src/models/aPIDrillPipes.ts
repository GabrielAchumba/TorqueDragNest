import * as mongoose from 'mongoose';
import { BaseModel } from './baseModel';

export class APIDrillPipeModel {
    component: string;
    nominalDiameter: number;
    nominalWeight: number;
    grade: string;
    connection: string;
    class: string;
    bodyOD: number;
    bodyID: number;
    weight: number;
    connectionOD: number;
    connectionID: number;
    connectionTorsionalYield: number;
    toolJointLength: number;
    linearCapacity: number;
    closedEndDisplacement: number;
    averageJointLength: number;
    makeupTorque: number;
    wallThickness: number;
  }

  export class APIDrillPipe {
    companyName: string;
    category: string;
    selectedDataTable: APIDrillPipeModel[];
  }

export interface APIDrillPipeDocument extends mongoose.Document, APIDrillPipe { }

export const APIDrillPipeSchema = new mongoose.Schema({
    companyName: {type: String, required: true },
    category: {type: String, required: true },
    selectedDataTable: [{
        component: {type: String, required: true },
        nominalDiameter: {type: Number, required: false },
        nominalWeight: {type: Number, required: false },
        grade: {type: String, required: false },
        connection: {type: String, required: false },
        class: {type: String, required: false },
        bodyOD: {type: Number, required: false },
        bodyID: {type: Number, required: false },
        weight: {type: Number, required: false },
        connectionOD: {type: Number, required: false },
        connectionID: {type: Number, required: false },
        connectionTorsionalYield: {type: Number, required: false },
        toolJointLength: {type: Number, required: false },
        linearCapacity: {type: Number, required: false },
        closedEndDisplacement: {type: Number, required: false },
        averageJointLength: {type: Number, required: false },
        makeupTorque: {type: Number, required: false },
        wallThickness: {type: Number, required: false },
    }]
  
  });
