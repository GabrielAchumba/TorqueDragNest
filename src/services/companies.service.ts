import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../models/company';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel('Company') private readonly companyModel: Model<CompanyDocument>,) {

    }

    async create(company: Company): Promise<any> {
        
        const foundComapny = await this.companyModel.findOne ({ "companyName" : company.companyName });
        
        if(foundComapny == null || foundComapny == undefined){
            const newCompany = new this.companyModel(company);
            return  newCompany.save();
        }else{
            const updatedItem =
             await this.companyModel.updateOne({companyName:company.companyName},
                company, {new: true});
            return  company
        }
        
        return  foundComapny;
    }


    async findAll(): Promise<CompanyDocument[]> {
        return this.companyModel.find().exec();
    }

    async findOne(id: string): Promise<CompanyDocument> {
        const company = await this.companyModel.findById(id);

        if(!company){
            throw new NotFoundException("could not find company.")
        }

        return company;
    }

    async update(id: string, company: Company): Promise<CompanyDocument> {
        const updatedCompany = await this.companyModel.findById(id);
        if(updatedCompany != null || updatedCompany != undefined){
            Object.assign(updatedCompany, company);
            updatedCompany.save();
        }

        return  updatedCompany;
    }

    async remove(id: string): Promise<void> {
        await this.companyModel.deleteOne({id}).exec();
    }


}
