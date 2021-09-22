import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BasePipe, BasePipeDocument } from 'src/models/basepipe';
import { BasePipesService } from 'src/services/basepipes.service';

@Controller('basePipes')
export class BasePipesController {

    constructor(private readonly basePipesService: BasePipesService) {

    }

    @Post('PostBasePipe')
    async create(@Body() basePipe: BasePipeDocument) {
        await this.basePipesService.create(basePipe);
    }

    @Get('GetBasePipes/:id')
    findOne(@Param('id') id: string): Promise<BasePipeDocument> {
        return this.basePipesService.findOne(id);
    }

    @Patch('PutBasePipe/:id')
    update(@Param('id') id: string, @Body() basePipe: BasePipe) {
      return this.basePipesService.update(id, basePipe);
    }
  
    @Get('GetBasePipes')
    async findAll(): Promise<BasePipeDocument[]> {
        return this.basePipesService.findAll();
    }

    @Delete('DeleteBasePipe/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.basePipesService.remove(id);
    } 
}
