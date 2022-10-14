import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MudPVT, MudPVTDocument } from '../models/mudpvt';
import { MudPVTsService } from '../services/mudpvts.service';
import { controller, PostMudPVTs, GetMudPVTs_designId,
    PutMudPVT_designId, GetMudPVTs, DeleteMudPVT_designId } from "../routes/mudpvts-routes";


@Controller(controller)
export class MudPVTsController {

    constructor(private readonly mudPVTsService: MudPVTsService) {

    }

    @Post(PostMudPVTs)
    async create(@Body() mudPVT: MudPVT) {
        await this.mudPVTsService.create(mudPVT);
    }

    @Get(GetMudPVTs_designId)
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.mudPVTsService.findOne(designId);
    }

    @Patch(PutMudPVT_designId)
    update(@Param('designId') designId: string, @Body() mudPVT: MudPVT) {
      return this.mudPVTsService.update(designId, mudPVT);
    }
  
    @Get(GetMudPVTs)
    async findAll(): Promise<MudPVTDocument[]> {
        return this.mudPVTsService.findAll();
    }

    @Delete(DeleteMudPVT_designId)
    remove(@Param('designId') designId: string): Promise<void> {
        return this.mudPVTsService.remove(designId);
    } 
}
