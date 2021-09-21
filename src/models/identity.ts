import * as mongoose from 'mongoose';

export class Identity {
    password: string;
    userName: string;
    companyName: string;
    roleName: string;
    isLogin: boolean;
  }


export interface IdentityDocument extends mongoose.Document, Identity { }

export const IdentitySchema = new mongoose.Schema({
    password: {type: String, required: true },
    userName: {type: String, required: false },
    companyName: {type: String, required: true },
    roleName: {type: String, required: true },
    isLogin: {type: Boolean, required: true },
  
  });
