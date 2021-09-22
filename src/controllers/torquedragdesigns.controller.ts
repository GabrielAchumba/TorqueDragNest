import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TorqueDragDesign, TorqueDragDesignDocument } from 'src/models/torquedragdesign';
import { TorqueDragDesignsService } from 'src/services/torquedragdesigns.service';


@Controller('torqueDragDesigns')
export class TorqueDragDesignsController {

    constructor(private readonly torqueDragDesignsService: TorqueDragDesignsService) {

    }

    @Post('PostTorqueDragDesign')
    async create(@Body() rig: TorqueDragDesign) {
        await this.torqueDragDesignsService.create(rig);
    }

    @Get('GetTorqueDragDesigns/:id')
    findOne(@Param('id') id: string): Promise<TorqueDragDesignDocument> {
        return this.torqueDragDesignsService.findOne(id);
    }

    @Patch('PutTorqueDragDesign/:id')
    update(@Param('id') id: string, @Body() rig: TorqueDragDesign) {
      return this.torqueDragDesignsService.update(id, rig);
    }
  
    @Get('GetTorqueDragDesigns')
    async findAll(): Promise<TorqueDragDesignDocument[]> {
        return this.torqueDragDesignsService.findAll();
    }

    @Delete('DeleteTorqueDragDesign/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.torqueDragDesignsService.remove(id);
    } 
}
