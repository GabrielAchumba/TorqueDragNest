import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rig, RigDocument } from '../models/rig';

@Injectable()
export class RigsService {
    constructor(@InjectModel('Rig') private readonly rigModel: Model<RigDocument>,) {

    }

    async create(rig: Rig): Promise<any> {
        
        const foundRig = await this.rigModel.findOne (
            { "userId" : rig.userId, "designId" : rig.designId });
        
        if(foundRig == null || foundRig == undefined){
            const newRig = new this.rigModel(rig);
            return  newRig.save();
        }else{
            const updatedItem =
             await this.rigModel.updateOne({designId:rig.designId},
                rig, {new: true});
            return  rig
        }
    }

   

    async findAll(): Promise<RigDocument[]> {
        return this.rigModel.find().exec();
    }

    async findOne(designId: string): Promise<RigDocument> {
        const rig = await this.rigModel.findOne({designId:designId});

        if(!rig){
            return {} as RigDocument;
        }

        return rig;
    }

    async update(id: string, rig: Rig): Promise<RigDocument> {
        const updatedRig = await this.rigModel.findById(id);
        if(updatedRig != null || updatedRig != undefined){
            Object.assign(updatedRig, rig);
            updatedRig.save();
        }

        return  updatedRig;
    }

    async remove(id: string): Promise<void> {
        await this.rigModel.deleteOne({id}).exec();
    }
}
