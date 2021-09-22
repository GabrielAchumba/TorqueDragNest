import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Operation, OperationDocument } from 'src/models/operation';
import { OperationsService } from 'src/services/operations.service';


@Controller('operations')
export class OperationsController {

    constructor(private readonly operationsService: OperationsService) {

    }

    @Post('PostOperation')
    async create(@Body() operation: Operation) {
        await this.operationsService.create(operation);
    }

    @Get('GetOperations/:id')
    findOne(@Param('id') id: string): Promise<OperationDocument> {
        return this.operationsService.findOne(id);
    }

    @Patch('PutOperation/:id')
    update(@Param('id') id: string, @Body() operation: Operation) {
      return this.operationsService.update(id, operation);
    }
  
    @Get('GetOperations')
    async findAll(): Promise<OperationDocument[]> {
        return this.operationsService.findAll();
    }

    @Delete('DeleteOperation/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.operationsService.remove(id);
    } 
}
