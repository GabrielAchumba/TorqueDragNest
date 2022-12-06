import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensitivityParameters, SensitivityParametersDocument } from '../models/sensitivityParameters';

@Injectable()
export class SensitivityParametersService {
    constructor(@InjectModel('SensitivityParameters') private readonly sensitivityParametersModel: Model<SensitivityParametersDocument>,) {

    }

    async create(sensitivityParameters: SensitivityParameters): Promise<any> {
        
        const foundItem = await this.sensitivityParametersModel.findOne (
            { "userId" : sensitivityParameters.userId, "designId" : sensitivityParameters.designId });
        
        if(foundItem == null || foundItem == undefined){
            const newItem = new this.sensitivityParametersModel(sensitivityParameters);
            return  newItem.save();
        }else{
            const updatedItem =
             await this.sensitivityParametersModel.updateOne({designId: sensitivityParameters.designId},
                sensitivityParameters, {new: true});
            return  sensitivityParameters
        }
        
        return  sensitivityParameters;
    }

   

    async findAll(): Promise<SensitivityParametersDocument[]> {
        return this.sensitivityParametersModel.find().exec();
    }

    async findOne(designId: string): Promise<SensitivityParametersDocument> {
        const item = await this.sensitivityParametersModel.findOne({designId:designId});

        if(!item){
            return {} as SensitivityParametersDocument;
        }

        return item;
    }

    async remove(id: string): Promise<void> {
        await this.sensitivityParametersModel.deleteOne({id}).exec();
    }
}
