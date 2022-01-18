import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MudPVT, MudPVTDocument } from 'src/models/mudpvt';
import { MudPVTsService } from 'src/services/mudpvts.service';


@Controller('MudPVTs')
export class MudPVTsController {

    constructor(private readonly mudPVTsService: MudPVTsService) {

    }

    @Post('PostMudPVTs')
    async create(@Body() mudPVT: MudPVT) {
        await this.mudPVTsService.create(mudPVT);
    }

    @Get('GetMudPVTs/:designId')
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.mudPVTsService.findOne(designId);
    }

    @Patch('PutMudPVT/:designId')
    update(@Param('designId') designId: string, @Body() mudPVT: MudPVT) {
      return this.mudPVTsService.update(designId, mudPVT);
    }
  
    @Get('GetMudPVTs')
    async findAll(): Promise<MudPVTDocument[]> {
        return this.mudPVTsService.findAll();
    }

    @Delete('DeleteMudPVT/:designId')
    remove(@Param('designId') designId: string): Promise<void> {
        return this.mudPVTsService.remove(designId);
    } 
}
