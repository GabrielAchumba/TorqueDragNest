import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseHoleSection, BaseHoleSectionDocument } from 'src/models/baseholesection';
import { BaseHoleSectionsService } from 'src/services/baseholesections.service';

@Controller('baseHoleSections')
export class BaseHoleSectionsController {

    constructor(private readonly baseHoleSectionsService: BaseHoleSectionsService) {

    }

    @Post('PostBaseHoleSection')
    async create(@Body() baseHoleSection: BaseHoleSection) {
        await this.baseHoleSectionsService.create(baseHoleSection);
    }

    @Get('GetBaseHoleSections/:id')
    findOne(@Param('id') id: string): Promise<BaseHoleSectionDocument> {
        return this.baseHoleSectionsService.findOne(id);
    }

    @Patch('PutBaseHoleSection/:id')
    update(@Param('id') id: string, @Body() baseHoleSection: BaseHoleSection) {
      return this.baseHoleSectionsService.update(id, baseHoleSection);
    }
  
    @Get('GetBaseHoleSections')
    async findAll(): Promise<BaseHoleSectionDocument[]> {
        return this.baseHoleSectionsService.findAll();
    }

    @Delete('DeleteBaseHoleSection/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.baseHoleSectionsService.remove(id);
    } 
}
