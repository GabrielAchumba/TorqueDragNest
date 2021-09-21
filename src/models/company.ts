import * as mongoose from 'mongoose';

export class Company {
    companyName: string;
    companyLogo: string;
    dbEngine: string;
    connectionString: string;
  }

export interface CompanyDocument extends mongoose.Document, Company { }

export const CompanySchema = new mongoose.Schema({
    companyName: {type: String, required: true },
    companyLogo: {type: String, required: false },
    dbEngine: {type: String, required: true },
    connectionString: {type: String, required: true },
  
  });
