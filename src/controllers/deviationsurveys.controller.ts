import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeviationSurveysService } from '../services/deviationsurveys.service';
import { DeviationSurvey, DeviationSurveyDocument } from '../models/deviationSurvey';

@Controller('deviationSurveys')
export class DeviationSurveysController {

    constructor(private readonly deviationSurveysService: DeviationSurveysService) {

    }

    @Post('PostDeviationSurvey')
    async create(@Body() deviationSurvey: DeviationSurvey) {
        await this.deviationSurveysService.create(deviationSurvey);
    }

    @Get('GetDeviationSurveys/:id')
    findOne(@Param('id') id: string): Promise<DeviationSurveyDocument> {
        return this.deviationSurveysService.findOne(id);
    }

    @Patch('PutDeviationSurvey/:id')
    update(@Param('id') id: string, @Body() deviationSurvey: DeviationSurvey) {
      return this.deviationSurveysService.update(id, deviationSurvey);
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
