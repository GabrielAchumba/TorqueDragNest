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


/* …or create a new repository on the command line
echo "# TorqueDragNest" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/GabrielAchumba/TorqueDragNest.git
git push -u origin main */

/* …or push an existing repository from the command line
git remote add origin https://github.com/GabrielAchumba/TorqueDragNest.git
git branch -M main
git push -u origin main */