import * as mongoose from 'mongoose';

export class User {
    firstName: string;
    middleName: string;
    lastName: string;
    companyName: string;
    roleName: string;
    jobDescription: string;
    password: string;
    userName: string;
}

export interface UserDocument extends mongoose.Document, User { }

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true },
    middleName: {type: String, required: true },
    lastName: {type: String, required: true },
    companyName: {type: String, required: true },
    roleName: {type: String, required: true },
    jobDescription: {type: String, required: true },
    password: {type: String, required: true },
    userName: {type: String, required: true },
  
  });
