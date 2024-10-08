import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MudPVT, MudPVTDocument, MudPVTModel } from '../models/mudpvt';

@Injectable()
export class MudPVTsService {
    constructor(@InjectModel('MudPVT') private readonly mudPVTModel: Model<MudPVTDocument>,) {

    }

    async create(mudPVT: MudPVT): Promise<any> {
        const foundMudPVT = await this.mudPVTModel.findOne (
            { "userId" : mudPVT.userId, "designId" : mudPVT.designId });
        
        if(foundMudPVT == null || foundMudPVT == undefined){
            const newMudPVT = new this.mudPVTModel(mudPVT);
            return  newMudPVT.save();
        }else{
            const updatedItem =
             await this.mudPVTModel.updateOne({designId:mudPVT.designId},
                mudPVT, {new: true});
            return  mudPVT
        }
    }

   

    async findAll(): Promise<MudPVTDocument[]> {
        return this.mudPVTModel.find().exec();
    }

    async findOne(designId: string): Promise<any> {
        const mudPVT = await this.mudPVTModel.findOne({designId: designId});

        if(!mudPVT){
            return [] as MudPVTModel[];
        }

        return mudPVT.mudPVTs;
    }

    async update(id: string, mudPVT: MudPVT): Promise<MudPVTDocument> {
        const updatedMudPVT = await this.mudPVTModel.findById(id);
        if(updatedMudPVT != null || updatedMudPVT != undefined){
            Object.assign(updatedMudPVT, mudPVT);
            updatedMudPVT.save();
        }

        return  updatedMudPVT;
    }

    async remove(id: string): Promise<void> {
        await this.mudPVTModel.deleteOne({id}).exec();
    }
}
