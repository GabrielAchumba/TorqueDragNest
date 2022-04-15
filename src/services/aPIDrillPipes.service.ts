import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { APIDrillPipe, APIDrillPipeDocument } from '../models/aPIDrillPipes';

@Injectable()
export class APIDrillPipesService {
    constructor(@InjectModel('APIDrillPipe') private readonly aPIDrillPipeModel: Model<APIDrillPipeDocument>,) {

    }

    async create(request: any): Promise<any> {
        
        const aPIDrillPipe = request as APIDrillPipe;
    
        const foundItem = await this.aPIDrillPipeModel.findOne (
            { "companyName" : aPIDrillPipe.companyName });
        
        if(foundItem == null || foundItem == undefined){
            const newItem = new this.aPIDrillPipeModel(aPIDrillPipe);
            return  newItem.save();
        }else{
            const updatedItem =
             await this.aPIDrillPipeModel.updateOne({companyName: aPIDrillPipe.companyName},
                aPIDrillPipe, {new: true});
            return  aPIDrillPipe
        }
        
        return  aPIDrillPipe;
    }

    async findAll(): Promise<APIDrillPipeDocument[]> {
        return this.aPIDrillPipeModel.find().exec();
    }

    async findOne(companyName: string): Promise<APIDrillPipeDocument> {
        const operation = await this.aPIDrillPipeModel.findOne({companyName:companyName});

        if(!operation){
            throw new NotFoundException("could not find APIDrillPipe.")
        }

        return operation;
    }

    async remove(id: string): Promise<void> {
        await this.aPIDrillPipeModel.deleteOne({id}).exec();
    }
}
