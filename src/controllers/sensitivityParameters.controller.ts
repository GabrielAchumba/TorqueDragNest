import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SensitivityParameters, SensitivityParametersDocument } from '../models/sensitivityParameters';
import { SensitivityParametersService } from '../services/sensitivityParameters.service';


@Controller('SensitivityParameters')
export class SensitivityParametersController {

    constructor(private readonly sensitivityParametersService: SensitivityParametersService) {

    }

    @Post('PostSensitivityParameters')
    async create(@Body() sensitivityParameters: SensitivityParameters) {
        return await this.sensitivityParametersService.create(sensitivityParameters);
    }

    @Get('GetSensitivityParameters/:designId')
    findOne(@Param('designId') designId: string): Promise<SensitivityParametersDocument> {
        return this.sensitivityParametersService.findOne(designId);
    }
  
    @Get('GetSensitivityParameters')
    async findAll(): Promise<SensitivityParametersDocument[]> {
        return this.sensitivityParametersService.findAll();
    }

    @Delete('DeleteSensitivityParameters/:designId')
    remove(@Param('designId') designId: string): Promise<void> {
        return this.sensitivityParametersService.remove(designId);
    } 
}
