import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operation, OperationDocument } from 'src/models/operation';

@Injectable()
export class OperationsService {
    constructor(@InjectModel('Operation') private readonly operationModel: Model<OperationDocument>,) {

    }

    async create(operation: Operation): Promise<OperationDocument> {
        
        const foundOperation = await this.operationModel.findOne (
            { "userId" : operation.userId, "designId" : operation.designId });
        
        if(foundOperation == null || foundOperation == undefined){
            const newOperation = new this.operationModel(operation);
            return  newOperation.save();
        }
        
        return  foundOperation;
    }

   

    async findAll(): Promise<OperationDocument[]> {
        return this.operationModel.find().exec();
    }

    async findOne(id: string): Promise<OperationDocument> {
        const mudPVT = await this.operationModel.findById(id);

        if(!mudPVT){
            throw new NotFoundException("could not find operation.")
        }

        return mudPVT;
    }

    async update(id: string, operation: Operation): Promise<OperationDocument> {
        const updatedOperation = await this.operationModel.findById(id);
        if(updatedOperation != null || updatedOperation != undefined){
            Object.assign(updatedOperation, operation);
            updatedOperation.save();
        }

        return  updatedOperation;
    }

    async remove(id: string): Promise<void> {
        await this.operationModel.deleteOne({id}).exec();
    }
}
