import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operation, OperationDocument } from '../models/operation';

@Injectable()
export class OperationsService {
    constructor(@InjectModel('Operation') private readonly operationModel: Model<OperationDocument>,) {

    }

    async create(operation: Operation): Promise<any> {
        
        const foundOperation = await this.operationModel.findOne (
            { "userId" : operation.userId, "designId" : operation.designId });
        
        if(foundOperation == null || foundOperation == undefined){
            const newOperation = new this.operationModel(operation);
            return  newOperation.save();
        }else{
            const updatedOperation =
             await this.operationModel.updateOne({designId:operation.designId},
                 operation, {new: true});
            return  operation
        }
        
        return  operation;
    }

   

    async findAll(): Promise<OperationDocument[]> {
        return this.operationModel.find().exec();
    }

    async findOne(designId: string): Promise<OperationDocument> {
        const operation = await this.operationModel.findOne({designId:designId});

        if(!operation){
            return {} as OperationDocument;
        }

        return operation;
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
