import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FluidsService } from 'src/services/fluilds.service';
import { Fluid, FluidDocument } from 'src/models/fluid';

@Controller('fluids')
export class FluidsController {

    constructor(private readonly fluidsService: FluidsService) {

    }

    @Post('PostFluid')
    async create(@Body() fluid: Fluid) {
        await this.fluidsService.create(fluid);
    }

    @Get('GetFluids/:id')
    findOne(@Param('id') id: string): Promise<FluidDocument> {
        return this.fluidsService.findOne(id);
    }

    @Patch('PutFluid/:id')
    update(@Param('id') id: string, @Body() fluid: Fluid) {
      return this.fluidsService.update(id, fluid);
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
