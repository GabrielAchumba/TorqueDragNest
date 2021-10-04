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
    userName: {type: String, required: true },
    companyName: {type: String, required: false },
    roleName: {type: String, required: false },
    isLogin: {type: Boolean, required: false },
  
  });
