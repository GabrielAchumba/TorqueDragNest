import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FluidsService } from '../services/fluilds.service';
import { Fluid, FluidDocument } from '../models/fluid';

@Controller('Fluids')
export class FluidsController {

    constructor(private readonly fluidsService: FluidsService) {

    }

    @Post('PostFluid')
    async create(@Body() fluid: Fluid) {
        await this.fluidsService.create(fluid);
    }

    @Get('GetFluid/:designId')
    findOne(@Param('designId') designId: string): Promise<FluidDocument> {
        return this.fluidsService.findOne(designId);
    }

    @Patch('PutFluid/:designId')
    update(@Param('designId') designId: string, @Body() fluid: Fluid) {
      return this.fluidsService.update(designId, fluid);
    }
  
    @Get('GetFluids')
    async findAll(): Promise<FluidDocument[]> {
        return this.fluidsService.findAll();
    }

    @Delete('DeleteFluid/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.fluidsService.remove(id);
    } 
}
