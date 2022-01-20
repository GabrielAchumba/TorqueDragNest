import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BasePipe, BasePipeDocument } from '../models/basepipe';

@Injectable()
export class BasePipesService {
    constructor(@InjectModel('BasePipe') private readonly basePipeModel: Model<BasePipeDocument>,) {

    }

    async create(basePipe: BasePipe): Promise<BasePipeDocument> {

        const foundBasePipe = await this.basePipeModel.findOne (
            { "userId" : basePipe.userId, "designId" : basePipe.designId });
        
        if(foundBasePipe == null || foundBasePipe == undefined){
            console.log('basePipe: ', basePipe);
            const newBasePipe = new this.basePipeModel(basePipe);
            console.log('newBasePipe: ', newBasePipe);
            return  newBasePipe.save();
        }
        
        
        return  foundBasePipe;
    }

   

    async findAll(): Promise<BasePipeDocument[]> {
        return this.basePipeModel.find().exec();
    }

    async findOne(designId: string): Promise<any> {
        const basePipe = await this.basePipeModel.findOne({designId:designId});

        if(!basePipe){
            throw new NotFoundException("could not find basePipe.")
        }

        return basePipe.pipes;
    }

    async update(id: string, basePipe: BasePipe): Promise<BasePipeDocument> {
        const updatedBasePipe = await this.basePipeModel.findById(id);
        if(updatedBasePipe != null || updatedBasePipe != undefined){
            Object.assign(updatedBasePipe, basePipe);
            updatedBasePipe.save();
        }

        return  updatedBasePipe;
    }

    async remove(id: string): Promise<void> {
        await this.basePipeModel.deleteOne({id}).exec();
    }
}
