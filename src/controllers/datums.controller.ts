import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DatumsService } from '../services/datums.service';
import { Datum, DatumDocument } from '../models/datum';
import { controller, PostDatum, GetDatums_designId,
    PutDatum_id, GetDatums, DeleteDatum_id } from "../routes/datums-routes";

@Controller(controller)
export class DatumsController {

    constructor(private readonly datumsService: DatumsService) {

    }

    @Post(PostDatum)
    async create(@Body() body: any) {
        return await this.datumsService.create(body);
    }

    @Get(GetDatums_designId)
    GetDatumsDesignId(@Param('designId') designId: string): Promise<any> {
        return this.datumsService.GetDatumsDesignId(designId);
    }

    @Patch(PutDatum_id)
    update(@Param('id') id: string, @Body() datum: Datum) {
      return this.datumsService.update(id, datum);
    }
  
    @Get(GetDatums)
    async findAll(): Promise<DatumDocument[]> {
        return this.datumsService.findAll();
    }

    @Delete(DeleteDatum_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.datumsService.remove(id);
    } 
}
