import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fluid, FluidDocument } from 'src/models/fluid';

@Injectable()
export class FluidsService {
    constructor(@InjectModel('Fluid') private readonly fluidModel: Model<FluidDocument>,) {

    }

    async create(fluid: Fluid): Promise<FluidDocument> {
        
        const foundFluid = await this.fluidModel.findOne({ "designId" : fluid.designId });
        
        if(foundFluid == null || foundFluid == undefined){
            const newFluid = new this.fluidModel(fluid);
            return  newFluid.save();
        }
        
        return  foundFluid;
    }

   

    async findAll(): Promise<FluidDocument[]> {
        return this.fluidModel.find().exec();
    }

    async findOne(id: string): Promise<FluidDocument> {
        const drillFluid = await this.fluidModel.findById(id);

        if(!drillFluid){
            throw new NotFoundException("could not find drillFluid.")
        }

        return drillFluid;
    }

    async update(id: string, fluid: Fluid): Promise<FluidDocument> {
        const updatedFluid = await this.fluidModel.findById(id);
        if(updatedFluid != null || updatedFluid != undefined){
            Object.assign(updatedFluid, fluid);
            updatedFluid.save();
        }

        return  updatedFluid;
    }

    async remove(id: string): Promise<void> {
        await this.fluidModel.deleteOne({id}).exec();
    }
}
