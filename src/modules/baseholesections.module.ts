import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseHoleSectionsController } from '../controllers/baseholesections.controller';
import { BaseHoleSectionSchema } from '../models/baseholesection';
import { BaseHoleSectionsService } from '../services/baseholesections.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostHoleSections, GetHoleSections_designId, 
  PutHoleSection_designId, GetHoleSections, DeleteHoleSection_id } 
  from "../routes/baseholesections-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BaseHoleSection', schema: BaseHoleSectionSchema }],
  'torquedragclientdb')],
  controllers: [BaseHoleSectionsController],
  providers: [BaseHoleSectionsService]
})

export class BaseHoleSectionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostHoleSections}`, method: RequestMethod.POST },
      { path: `${controller}/${GetHoleSections_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutHoleSection_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetHoleSections}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteHoleSection_id}`, method: RequestMethod.DELETE },
    )
  }
}
