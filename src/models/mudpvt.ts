import * as mongoose from 'mongoose';

export class MudPVTModel {
    temperature: number;
    pressure: number;
    reference: string;
    density: number;
    plasticViscoity: number;
    yieldPoint: number;
  }

  export class MudPVT {
    designId: string;
    userId: string;
    mudPVTs: MudPVTModel[];
  }

export interface MudPVTDocument extends mongoose.Document, MudPVT { }

export const MudPVTSchema = new mongoose.Schema({
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    mudPVTs: [{
        temperature: {
            type: Number,
            required: false
        },
        pressure: {
            type: Number,
            required: false
        },
        reference: {
            type: String,
            required: false
        }, 
        density: {
            type: Number,
            required: false
        }, 
        plasticViscoity: {
            type: Number,
            required: false
        }, 
        yieldPoint: {
            type: Number,
            required: false
        }
    }]
  
  });
