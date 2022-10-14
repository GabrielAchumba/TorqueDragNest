import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Operation, OperationDocument } from '../models/operation';
import { OperationsService } from '../services/operations.service';
import { controller, PostOperation, GetOperation_designId,
    PutOperation_designId, GetOperations, DeleteOperation_designId } from "../routes/operations-routes";


@Controller(controller)
export class OperationsController {

    constructor(private readonly operationsService: OperationsService) {

    }

    @Post(PostOperation)
    async create(@Body() operation: Operation) {
        return await this.operationsService.create(operation);
    }

    @Get(GetOperation_designId)
    findOne(@Param('designId') designId: string): Promise<OperationDocument> {
        return this.operationsService.findOne(designId);
    }

    @Patch(PutOperation_designId)
    update(@Param('designId') designId: string, @Body() operation: Operation) {
      return this.operationsService.update(designId, operation);
    }
  
    @Get(GetOperations)
    async findAll(): Promise<OperationDocument[]> {
        return this.operationsService.findAll();
    }

    @Delete(DeleteOperation_designId)
    remove(@Param('designId') designId: string): Promise<void> {
        return this.operationsService.remove(designId);
    } 
}
