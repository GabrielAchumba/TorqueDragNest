import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Datum, DatumDocument } from '../models/datum';

@Injectable()
export class DatumsService {
    constructor(@InjectModel('Datum') private readonly datumModel: Model<DatumDocument>,) {

    }
    
    async create(datum: Datum): Promise<DatumDocument> {
        
        const foundDatum = await this.datumModel.findOne ({ "datumName" : datum.datumName,
        "designId" : datum.designId, "userId" : datum.userId });
        
        if(foundDatum == null || foundDatum == undefined){
            const newDatum = new this.datumModel(datum);
            return  newDatum.save();
        }
        
        return  foundDatum;
    }

   

    async findAll(): Promise<DatumDocument[]> {
        return this.datumModel.find().exec();
    }

    async findOne(id: string): Promise<DatumDocument> {
        const datum = await this.datumModel.findById(id);

        if(!datum){
            throw new NotFoundException("could not find datum.")
        }

        return datum;
    }

    async update(id: string, datum: Datum): Promise<DatumDocument> {
        const updatedDatum = await this.datumModel.findById(id);
        if(updatedDatum != null || updatedDatum != undefined){
            Object.assign(updatedDatum, datum);
            updatedDatum.save();
        }

        return  updatedDatum;
    }

    async remove(id: string): Promise<void> {
        await this.datumModel.deleteOne({id}).exec();
    }
}
