import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MudPVT, MudPVTDocument } from 'src/models/mudpvt';
import { MudPVTsService } from 'src/services/mudpvts.service';


@Controller('mudPVTs')
export class MudPVTsController {

    constructor(private readonly mudPVTsService: MudPVTsService) {

    }

    @Post('PostMudPVT')
    async create(@Body() mudPVT: MudPVT) {
        await this.mudPVTsService.create(mudPVT);
    }

    @Get('GetMudPVTs/:id')
    findOne(@Param('id') id: string): Promise<MudPVTDocument> {
        return this.mudPVTsService.findOne(id);
    }

    @Patch('PutMudPVT/:id')
    update(@Param('id') id: string, @Body() mudPVT: MudPVT) {
      return this.mudPVTsService.update(id, mudPVT);
    }
  
    @Get('GetMudPVTs')
    async findAll(): Promise<MudPVTDocument[]> {
        return this.mudPVTsService.findAll();
    }

    @Delete('DeleteMudPVT/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.mudPVTsService.remove(id);
    } 
}
