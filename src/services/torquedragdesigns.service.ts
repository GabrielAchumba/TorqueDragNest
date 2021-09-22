import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TorqueDragDesign, TorqueDragDesignDocument } from 'src/models/torquedragdesign';

@Injectable()
export class TorqueDragDesignsService {
    constructor(@InjectModel('TorqueDragDesign') private readonly torqueDragDesignModel: Model<TorqueDragDesignDocument>,) {

    }

    async create(torqueDragDesign: TorqueDragDesign): Promise<TorqueDragDesignDocument> {
        
        const foundTorqueDragDesign = await this.torqueDragDesignModel.findOne (
            { "userId" : torqueDragDesign.userId, "uniqueId" : torqueDragDesign.uniqueId });
        
        if(foundTorqueDragDesign == null || foundTorqueDragDesign == undefined){
            const newTorqueDragDesign = new this.torqueDragDesignModel(torqueDragDesign);
            return  newTorqueDragDesign.save();
        }
        
        return  foundTorqueDragDesign;
    }

   

    async findAll(): Promise<TorqueDragDesignDocument[]> {
        return this.torqueDragDesignModel.find().exec();
    }

    async findOne(id: string): Promise<TorqueDragDesignDocument> {
        const torqueDragDesign = await this.torqueDragDesignModel.findById(id);

        if(!torqueDragDesign){
            throw new NotFoundException("could not find torqueDragDesign.")
        }

        return torqueDragDesign;
    }

    async update(id: string, torqueDragDesign: TorqueDragDesign): Promise<TorqueDragDesignDocument> {
        const updatedTorqueDragDesign = await this.torqueDragDesignModel.findById(id);
        if(updatedTorqueDragDesign != null || updatedTorqueDragDesign != undefined){
            Object.assign(updatedTorqueDragDesign, torqueDragDesign);
            updatedTorqueDragDesign.save();
        }

        return  updatedTorqueDragDesign;
    }

    async remove(id: string): Promise<void> {
        await this.torqueDragDesignModel.deleteOne({id}).exec();
    }
}
