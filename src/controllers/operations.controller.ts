import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Operation, OperationDocument } from 'src/models/operation';
import { OperationsService } from 'src/services/operations.service';


@Controller('Operations')
export class OperationsController {

    constructor(private readonly operationsService: OperationsService) {

    }

    @Post('PostOperation')
    async create(@Body() operation: Operation) {
        await this.operationsService.create(operation);
    }

    @Get('GetOperation/:designId')
    findOne(@Param('designId') designId: string): Promise<OperationDocument> {
        return this.operationsService.findOne(designId);
    }

    @Patch('PutOperation/:designId')
    update(@Param('designId') designId: string, @Body() operation: Operation) {
      return this.operationsService.update(designId, operation);
    }
  
    @Get('GetOperations')
    async findAll(): Promise<OperationDocument[]> {
        return this.operationsService.findAll();
    }

    @Delete('DeleteOperation/:designId')
    remove(@Param('designId') designId: string): Promise<void> {
        return this.operationsService.remove(designId);
    } 
}
