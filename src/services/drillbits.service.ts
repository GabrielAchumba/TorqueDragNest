import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DrillBit, DrillBitDocument } from '../models/drillbit';

@Injectable()
export class DrillBitsService {
    constructor(@InjectModel('DrillBit') private readonly drillBitModel: Model<DrillBitDocument>,) {

    }

    async create(drillBit: DrillBit): Promise<DrillBitDocument> {
        
        const foundDrillBit = await this.drillBitModel.findOne(
            { "userId" : drillBit.userId, "designId" : drillBit.designId });
        
        if(foundDrillBit == null || foundDrillBit == undefined){
            const newDrillBit = new this.drillBitModel(drillBit);
            return  newDrillBit.save();
        }
        
        return  foundDrillBit;
    }

   

    async findAll(): Promise<DrillBitDocument[]> {
        return this.drillBitModel.find().exec();
    }

    async findOne(id: string): Promise<DrillBitDocument> {
        const drillBit = await this.drillBitModel.findById(id);

        if(!drillBit){
            throw new NotFoundException("could not find drillBit.")
        }

        return drillBit;
    }

    async update(id: string, drillBit: DrillBit): Promise<DrillBitDocument> {
        const updatedDrillBit = await this.drillBitModel.findById(id);
        if(updatedDrillBit != null || updatedDrillBit != undefined){
            Object.assign(updatedDrillBit, drillBit);
            updatedDrillBit.save();
        }

        return  updatedDrillBit;
    }

    async remove(id: string): Promise<void> {
        await this.drillBitModel.deleteOne({id}).exec();
    }
}
