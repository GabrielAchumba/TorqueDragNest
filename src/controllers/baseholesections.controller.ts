import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BaseHoleSection, BaseHoleSectionDocument } from '../models/baseholesection';
import { BaseHoleSectionsService } from '../services/baseholesections.service';
import { controller, PostHoleSections, GetHoleSections_designId, 
    PutHoleSection_designId, GetHoleSections, DeleteHoleSection_id } 
    from "../routes/baseholesections-routes";

@Controller(controller)
export class BaseHoleSectionsController {

    constructor(private readonly baseHoleSectionsService: BaseHoleSectionsService) {

    }

    @Post(PostHoleSections)
    async create(@Body() baseHoleSection: BaseHoleSection) {
        await this.baseHoleSectionsService.create(baseHoleSection);
    }

    @Get(GetHoleSections_designId)
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.baseHoleSectionsService.findOne(designId);
    }

    @Patch(PutHoleSection_designId)
    update(@Param('designId') designId: string, @Body() baseHoleSection: BaseHoleSection) {
      return this.baseHoleSectionsService.update(designId, baseHoleSection);
    }
  
    @Get(GetHoleSections)
    async findAll(): Promise<BaseHoleSectionDocument[]> {
        return this.baseHoleSectionsService.findAll();
    }

    @Delete(DeleteHoleSection_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.baseHoleSectionsService.remove(id);
    } 
}
