import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TorqueDragDesignDTO, WellDesignDTO } from 'src/dtos/torqueDragDesignDTO';
import { TorqueDragDesign, TorqueDragDesignDocument } from 'src/models/torquedragdesign';
import { TorqueDragDesignsService } from 'src/services/torquedragdesigns.service';


@Controller('torqueDragDesigns')
export class TorqueDragDesignsController {

    constructor(private readonly torqueDragDesignsService: TorqueDragDesignsService) {

    }

    @Get('GetTorqueDragDesigns')
    async findAll(): Promise<WellDesignDTO> {
        return this.torqueDragDesignsService.getTorqueDragDesigns();
    }


    @Post('PostSelectedWellDesign')
    async postSelectedWellDesign(@Body() wellDesignDTO: WellDesignDTO) {
        const item = await this.torqueDragDesignsService.postSelectedWellDesign(wellDesignDTO);
        return item;
    }

    @Get('GetWellDesignsByUserId/:id')
    async findAllByUserId(@Param('id') id: string): Promise<WellDesignDTO> {
        return this.torqueDragDesignsService.getWellDesignsByUserId(id);
    }

    @Post('postTorqueDragDesign')
    async postTorqueDragDesign(@Body() torqueDragDesignDTO: TorqueDragDesignDTO): Promise<TorqueDragDesignDTO> {
        const item = await this.torqueDragDesignsService.postTorqueDragDesign(torqueDragDesignDTO);
        return item;
    }

    @Patch('PutTorqueDragDesign/:id')
    putTorqueDragDesign(@Param('id') id: string, @Body() rig: TorqueDragDesign) {
      return this.torqueDragDesignsService.putTorqueDragDesign(id, rig);
    }
  

    @Delete('DeleteTorqueDragDesign/:id')
    deleteTorqueDragDesign(@Param('id') id: string): Promise<TorqueDragDesignDocument> {
        return this.torqueDragDesignsService.deleteTorqueDragDesign(id);
    } 
}
