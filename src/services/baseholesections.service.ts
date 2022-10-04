import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseHoleSection, BaseHoleSectionDocument, BaseHoleSectionModel } from '../models/baseholesection';

@Injectable()
export class BaseHoleSectionsService {
    constructor(@InjectModel('BaseHoleSection') private readonly baseHoleSectionModel: Model<BaseHoleSectionDocument>,) {

    }

    async create(baseHoleSection: BaseHoleSection): Promise<BaseHoleSectionDocument> {
        const foundBaseHoleSection = await this.baseHoleSectionModel.findOne (
            { "userId" : baseHoleSection.userId, "designId" : baseHoleSection.designId });
        
        if(foundBaseHoleSection == null || foundBaseHoleSection == undefined){
            const newBaseHoleSection = new this.baseHoleSectionModel(baseHoleSection);
            return  newBaseHoleSection.save();
        }
        
        return  foundBaseHoleSection;
    }

   

    async findAll(): Promise<BaseHoleSectionDocument[]> {
        return this.baseHoleSectionModel.find().exec();
    }

    async findOne(designId: string): Promise<any> {
        const baseHoleSection = await this.baseHoleSectionModel.findOne({designId:designId});

        if(!baseHoleSection){
            return [] as BaseHoleSectionModel[];
        }

        return baseHoleSection.holeSections;
    }

    async update(id: string, baseHoleSection: BaseHoleSection): Promise<BaseHoleSectionDocument> {
        const updatedBaseHoleSection = await this.baseHoleSectionModel.findById(id);
        if(updatedBaseHoleSection != null || updatedBaseHoleSection != undefined){
            Object.assign(updatedBaseHoleSection, baseHoleSection);
            updatedBaseHoleSection.save();
        }

        return  updatedBaseHoleSection;
    }

    async remove(id: string): Promise<void> {
        await this.baseHoleSectionModel.deleteOne({id}).exec();
    }
}
