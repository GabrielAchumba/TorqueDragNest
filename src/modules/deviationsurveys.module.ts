import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviationSurveysController } from '../controllers/deviationsurveys.controller';
import { DeviationSurveysService } from '../services/deviationsurveys.service';
import { DeviationSurveySchema } from '../models/deviationSurvey'
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostDeviationSurvey, GetDeviationSurveys_designId, 
  PutDeviationSurvey_designId, GetDeviationSurveys, DeleteDeviationSurvey_id } 
  from "../routes/deviationsurveys-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'DeviationSurvey', schema: DeviationSurveySchema }],
  'torquedragclientdb')],
  controllers: [DeviationSurveysController],
  providers: [DeviationSurveysService]
})

export class DeviationSurvesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostDeviationSurvey}`, method: RequestMethod.POST },
      { path: `${controller}/${GetDeviationSurveys_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutDeviationSurvey_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetDeviationSurveys}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteDeviationSurvey_id}`, method: RequestMethod.DELETE },
    )
  }
}
