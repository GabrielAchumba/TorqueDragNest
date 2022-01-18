import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeviationSurveysService } from '../services/deviationsurveys.service';
import { DeviationSurvey, DeviationSurveyDocument, DeviationSurveyModel } from '../models/deviationSurvey';
import { AnyARecord } from 'dns';

@Controller('DeviationSurveys')
export class DeviationSurveysController {

    constructor(private readonly deviationSurveysService: DeviationSurveysService) {

    }

    @Post('PostDeviationSurvey')
    async create(@Body() body: any) {
        return await this.deviationSurveysService.create(body);
    }

    @Get('GetDeviationSurveys/:designId')
    findOne(@Param('designId') designId: string): Promise<any> {
        return this.deviationSurveysService.findOne(designId);
    }

    @Patch('PutDeviationSurvey/:designId')
    update(@Param('designId') designId: string, @Body() deviationSurvey: DeviationSurvey) {
      return this.deviationSurveysService.update(designId, deviationSurvey);
    }
  
    @Get('GetDeviationSurveys')
    async findAll(): Promise<DeviationSurveyDocument[]> {
        return this.deviationSurveysService.findAll();
    }

    @Delete('DeleteDeviationSurvey/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.deviationSurveysService.remove(id);
    } 
}
