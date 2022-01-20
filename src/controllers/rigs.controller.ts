import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Rig, RigDocument } from '../models/rig';
import { RigsService } from '../services/rigs.service';


@Controller('Rigs')
export class RigsController {

    constructor(private readonly rigsService: RigsService) {

    }

    @Post('PostRig')
    async create(@Body() rig: Rig) {
        await this.rigsService.create(rig);
    }

    @Get('GetRig/:designId')
    findOne(@Param('designId') designId: string): Promise<RigDocument> {
        console.log("GetRig Called");
        return this.rigsService.findOne(designId);
    }

    @Patch('PutRig/:designId')
    update(@Param('designId') designId: string, @Body() rig: Rig) {
      return this.rigsService.update(designId, rig);
    }
  
    @Get('GetRigs')
    async findAll(): Promise<RigDocument[]> {
        return this.rigsService.findAll();
    }

    @Delete('DeleteRig/:designId')
    remove(@Param('designId') designId: string): Promise<void> {
        return this.rigsService.remove(designId);
    } 
}
