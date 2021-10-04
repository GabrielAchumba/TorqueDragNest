import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviationSurveysController } from '../controllers/deviationsurveys.controller';
import { DeviationSurveysService } from '../services/deviationsurveys.service';
import { DeviationSurveySchema } from '../models/deviationSurvey'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DeviationSurvey', schema: DeviationSurveySchema }],
  'torquedragclientdb')],
  controllers: [DeviationSurveysController],
  providers: [DeviationSurveysService]
})
export class DeviationSurvesModule {}
