import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Common, CommonDocument } from '../models/common';

@Injectable()
export class CommonsService {
    constructor(@InjectModel('Common') private readonly commonModel: Model<CommonDocument>,) {

    }

    async create(common: Common): Promise<CommonDocument> {
        
        const foundCommon = await this.commonModel.findOne ({ "designId" : common.designId });
        
        if(foundCommon == null || foundCommon == undefined){
            const newCommon = new this.commonModel(common);
            return  newCommon.save();
        }
        
        return  foundCommon;
    }

   

    async findAll(): Promise<CommonDocument[]> {
        return this.commonModel.find().exec();
    }

    async findOne(id: string): Promise<CommonDocument> {
        const common = await this.commonModel.findById(id);

        if(!common){
            throw new NotFoundException("could not find common.")
        }

        return common;
    }

    async update(id: string, common: Common): Promise<CommonDocument> {
        const updatedCommon = await this.commonModel.findById(id);
        if(updatedCommon != null || updatedCommon != undefined){
            Object.assign(updatedCommon, common);
            updatedCommon.save();
        }

        return  updatedCommon;
    }

    async remove(id: string): Promise<void> {
        await this.commonModel.deleteOne({id}).exec();
    }
}
