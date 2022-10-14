import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TorqueDragDesignDTO, WellDesignDTO } from '../dtos/torqueDragDesignDTO';
import { TorqueDragDesign, TorqueDragDesignDocument } from '../models/torquedragdesign';
import { TorqueDragDesignsService } from '../services/torquedragdesigns.service';
import { controller,  GetTorqueDragDesigns, PostSelectedWellDesign,
    GetWellDesignsByUserId_id, PostTorqueDragDesign, PutTorqueDragDesign_id,
    DeleteTorqueDragDesign_id } from "../routes/torquedragdesigns-routes";


@Controller(controller)
export class TorqueDragDesignsController {

    constructor(private readonly torqueDragDesignsService: TorqueDragDesignsService) {

    }

    @Get(GetTorqueDragDesigns)
    async findAll(): Promise<any> {
        return this.torqueDragDesignsService.getTorqueDragDesigns();
    }


    @Post(PostSelectedWellDesign)
    async postSelectedWellDesign(@Body() wellDesignDTO: any) {
        const item = await this.torqueDragDesignsService.postSelectedWellDesign(wellDesignDTO);
        return item;
    }

    @Get(GetWellDesignsByUserId_id)
    async findAllByUserId(@Param('id') id: string): Promise<any> {
        return this.torqueDragDesignsService.getWellDesignsByUserId(id);
    }


    @Post(PostTorqueDragDesign)
    async postTorqueDragDesign(@Body() torqueDragDesignDTO: TorqueDragDesignDTO): Promise<TorqueDragDesignDTO> {
        const item = await this.torqueDragDesignsService.postTorqueDragDesign(torqueDragDesignDTO);
        return item;
    }

    @Patch(PutTorqueDragDesign_id)
    putTorqueDragDesign(@Param('id') id: string, @Body() rig: TorqueDragDesign) {
      return this.torqueDragDesignsService.putTorqueDragDesign(id, rig);
    }
  

    @Delete(DeleteTorqueDragDesign_id)
    deleteTorqueDragDesign(@Param('id') id: string): Promise<TorqueDragDesignDocument> {
        return this.torqueDragDesignsService.deleteTorqueDragDesign(id);
    } 
}
