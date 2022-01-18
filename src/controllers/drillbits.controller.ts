import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DrillBitsService } from '../services/drillbits.service';
import { DrillBit, DrillBitDocument } from '../models/drillbit';

@Controller('DrillBits')
export class DrillBitsController {

    constructor(private readonly drillBitsService: DrillBitsService) {

    }

    @Post('PostDrillBit')
    async create(@Body() drillBit: DrillBit) {
        await this.drillBitsService.create(drillBit);
    }

    @Get('GetDrillBit/:designId')
    findOne(@Param('designId') designId: string): Promise<DrillBitDocument> {
        return this.drillBitsService.findOne(designId);
    }

    @Patch('PutDrillBit/:designId')
    update(@Param('designId') designId: string, @Body() drillBit: DrillBit) {
      return this.drillBitsService.update(designId, drillBit);
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
