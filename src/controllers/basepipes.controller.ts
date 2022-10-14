import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { from } from 'rxjs';
import { BasePipe, BasePipeDocument } from '../models/basepipe';
import { BasePipesService } from '../services/basepipes.service';
import { controller, PostPipes, GetPipes_designId, PutPipe_designId, GetPipes, DeletePipe_id } from
"../routes/basepipes-routes";

@Controller(controller)
export class BasePipesController {

    constructor(private readonly basePipesService: BasePipesService) {

    }

    @Post(PostPipes)
    async create(@Body() basePipe: BasePipe) {
        return await this.basePipesService.create(basePipe);
    }

    @Get(GetPipes_designId)
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.basePipesService.findOne(designId);
    }

    @Patch(PutPipe_designId)
    update(@Param('designId') designId: string, @Body() basePipe: BasePipe) {
      return this.basePipesService.update(designId, basePipe);
    }
  
    @Get(GetPipes)
    async findAll(): Promise<BasePipeDocument[]> {
        return this.basePipesService.findAll();
    }

    @Delete(DeletePipe_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.basePipesService.remove(id);
    } 
}
