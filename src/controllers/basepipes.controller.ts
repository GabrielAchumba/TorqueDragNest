import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BasePipe, BasePipeDocument } from 'src/models/basepipe';
import { BasePipesService } from 'src/services/basepipes.service';

@Controller('Pipes')
export class BasePipesController {

    constructor(private readonly basePipesService: BasePipesService) {

    }

    @Post('PostPipes')
    async create(@Body() basePipe: BasePipe) {
        return await this.basePipesService.create(basePipe);
    }

    @Get('GetPipes/:designId')
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.basePipesService.findOne(designId);
    }

    @Patch('PutPipe/:designId')
    update(@Param('designId') designId: string, @Body() basePipe: BasePipe) {
      return this.basePipesService.update(designId, basePipe);
    }
  
    @Get('GetPipes')
    async findAll(): Promise<BasePipeDocument[]> {
        return this.basePipesService.findAll();
    }

    @Delete('DeletePipe/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.basePipesService.remove(id);
    } 
}
