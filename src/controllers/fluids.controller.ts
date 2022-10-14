import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FluidsService } from '../services/fluilds.service';
import { Fluid, FluidDocument } from '../models/fluid';
import { controller, PostFluid, GetFluid_designId,
    PutFluid_designId, GetFluids, DeleteFluid_id } from "../routes/fluids-routes";

@Controller(controller)
export class FluidsController {

    constructor(private readonly fluidsService: FluidsService) {

    }

    @Post(PostFluid)
    async create(@Body() fluid: Fluid) {
        await this.fluidsService.create(fluid);
    }

    @Get(GetFluid_designId)
    findOne(@Param('designId') designId: string): Promise<FluidDocument> {
        return this.fluidsService.findOne(designId);
    }

    @Patch(PutFluid_designId)
    update(@Param('designId') designId: string, @Body() fluid: Fluid) {
      return this.fluidsService.update(designId, fluid);
    }
  
    @Get(GetFluids)
    async findAll(): Promise<FluidDocument[]> {
        return this.fluidsService.findAll();
    }

    @Delete(DeleteFluid_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.fluidsService.remove(id);
    } 
}
