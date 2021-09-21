import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DatumsService } from '../services/datums.service';
import { Datum, DatumDocument } from '../models/datum';

@Controller('daums')
export class DatumsController {

    constructor(private readonly datumsService: DatumsService) {

    }

    @Post('PostDatum')
    async create(@Body() datum: Datum) {
        await this.datumsService.create(datum);
    }

    @Get('GetDatums/:id')
    findOne(@Param('id') id: string): Promise<DatumDocument> {
        return this.datumsService.findOne(id);
    }

    @Patch('PutDatum/:id')
    update(@Param('id') id: string, @Body() datum: Datum) {
      return this.datumsService.update(id, datum);
    }
  
    @Get('GetDatums')
    async findAll(): Promise<DatumDocument[]> {
        return this.datumsService.findAll();
    }

    @Delete('DeleteDatum/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.datumsService.remove(id);
    } 
}
