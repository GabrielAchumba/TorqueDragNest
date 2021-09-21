import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommonsService } from '../services/commons.service';
import { Common, CommonDocument } from '../models/common';

@Controller('commons')
export class CommonsController {

    constructor(private readonly commonsService: CommonsService) {

    }

    @Post('PostCommon')
    async create(@Body() common: Common) {
        await this.commonsService.create(common);
    }

    @Get('GetCommons/:id')
    findOne(@Param('id') id: string): Promise<CommonDocument> {
        return this.commonsService.findOne(id);
    }

    @Patch('PutCommon/:id')
    update(@Param('id') id: string, @Body() common: Common) {
      return this.commonsService.update(id, common);
    }
  
    @Get('GetCommons')
    async findAll(): Promise<CommonDocument[]> {
        return this.commonsService.findAll();
    }

    @Delete('DeleteCommon/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.commonsService.remove(id);
    } 
}
