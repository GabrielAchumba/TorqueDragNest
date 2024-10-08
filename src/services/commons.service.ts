import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Common, CommonDocument } from '../models/common';

@Injectable()
export class CommonsService {
    constructor(@InjectModel('Common') private readonly commonModel: Model<CommonDocument>,) {

    }

    async create(common: Common): Promise<any> {
        
        const foundCommon = await this.commonModel.findOne ({ "designId" : common.designId });
        
        if(foundCommon == null || foundCommon == undefined){
            console.log("new item saved")
            const newCommon = new this.commonModel(common);
            return  newCommon.save();
        }else{
            console.log("item updated")
            const updatedItem =
             await this.commonModel.updateOne({designId:common.designId},
                common, {new: true});
            return  common
        }
    }

   

    async findAll(): Promise<CommonDocument[]> {
        return this.commonModel.find().exec();
    }

    async findOne(designId: string): Promise<CommonDocument> {
        const common = await this.commonModel.findOne({designId:designId});

        if(!common){
            return  {} as CommonDocument;
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

    async runSimulation(common: Common): Promise<CommonDocument> {
        
        const foundCommon = await this.commonModel.findOne ({ "designId" : common.designId });
        
        if(foundCommon == null || foundCommon == undefined){
            const newCommon = new this.commonModel(common);
            return  newCommon.save();
        }
        
        return  foundCommon;
    }

   
}
