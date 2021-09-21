import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DrillBitsService } from '../services/drillbits.service';
import { DrillBit, DrillBitDocument } from '../models/drillbit';

@Controller('drillBits')
export class DrillBitsController {

    constructor(private readonly drillBitsService: DrillBitsService) {

    }

    @Post('PostDrillBit')
    async create(@Body() drillBit: DrillBit) {
        await this.drillBitsService.create(drillBit);
    }

    @Get('GetDrillBits/:id')
    findOne(@Param('id') id: string): Promise<DrillBitDocument> {
        return this.drillBitsService.findOne(id);
    }

    @Patch('PutDrillBit/:id')
    update(@Param('id') id: string, @Body() drillBit: DrillBit) {
      return this.drillBitsService.update(id, drillBit);
    }
  
    @Get('GetDrillBits')
    async findAll(): Promise<DrillBitDocument[]> {
        return this.drillBitsService.findAll();
    }

    @Delete('DeleteDrillBit/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.drillBitsService.remove(id);
    } 
}
