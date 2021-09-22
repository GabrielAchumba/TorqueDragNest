import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Rig, RigDocument } from 'src/models/rig';
import { RigsService } from 'src/services/rigs.service';


@Controller('rigs')
export class RigsController {

    constructor(private readonly rigsService: RigsService) {

    }

    @Post('PostRig')
    async create(@Body() rig: Rig) {
        await this.rigsService.create(rig);
    }

    @Get('GetRigs/:id')
    findOne(@Param('id') id: string): Promise<RigDocument> {
        return this.rigsService.findOne(id);
    }

    @Patch('PutRig/:id')
    update(@Param('id') id: string, @Body() rig: Rig) {
      return this.rigsService.update(id, rig);
    }
  
    @Get('GetRigs')
    async findAll(): Promise<RigDocument[]> {
        return this.rigsService.findAll();
    }

    @Delete('DeleteRig/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.rigsService.remove(id);
    } 
}
