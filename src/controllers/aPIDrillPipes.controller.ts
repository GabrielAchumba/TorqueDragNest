import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { from } from 'rxjs';
import { APIDrillPipe, APIDrillPipeDocument } from '../models/aPIDrillPipes';
import { APIDrillPipesService } from '../services/aPIDrillPipes.service';
import { PostAPIDrillPipes, GetAPIDrillPipes_companyName, GetAPIDrillPipes, 
    DeleteAPIDrillPipe_designId, controller } from
"../routes/aPIDrillPipes-routes";


@Controller(controller)
export class APIDrillPipesController {

    constructor(private readonly aPIDrillPipesService: APIDrillPipesService) {

    }

    @Post(PostAPIDrillPipes)
    async create(@Body() aPIDrillPipe: APIDrillPipe) {
        return await this.aPIDrillPipesService.create(aPIDrillPipe);
    }

    @Get(GetAPIDrillPipes_companyName)
    findOne(@Param('companyName') companyName: string): Promise<APIDrillPipeDocument> {
        return this.aPIDrillPipesService.findOne(companyName);
    }
  
    @Get(GetAPIDrillPipes)
    async findAll(): Promise<APIDrillPipeDocument[]> {
        return this.aPIDrillPipesService.findAll();
    }

    @Delete(DeleteAPIDrillPipe_designId)
    remove(@Param('designId') designId: string): Promise<void> {
        return this.aPIDrillPipesService.remove(designId);
    } 
}
