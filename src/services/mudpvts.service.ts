import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MudPVT, MudPVTDocument } from 'src/models/mudpvt';

@Injectable()
export class MudPVTsService {
    constructor(@InjectModel('MudPVT') private readonly mudPVTModel: Model<MudPVTDocument>,) {

    }

    async create(mudPVT: MudPVT): Promise<MudPVTDocument> {
        console.log('mudPVT: ', mudPVT);
        const foundMudPVT = await this.mudPVTModel.findOne (
            { "userId" : mudPVT.userId, "designId" : mudPVT.designId });
        
        if(foundMudPVT == null || foundMudPVT == undefined){
            const newMudPVT = new this.mudPVTModel(mudPVT);
            return  newMudPVT.save();
        }
        
        return  foundMudPVT;
    }

   

    async findAll(): Promise<MudPVTDocument[]> {
        return this.mudPVTModel.find().exec();
    }

    async findOne(designId: string): Promise<any> {
        const mudPVT = await this.mudPVTModel.findOne({designId: designId});

        if(!mudPVT){
            throw new NotFoundException("could not find mudPVT.")
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
