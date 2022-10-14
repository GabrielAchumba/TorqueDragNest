import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonsController } from '../controllers/commons.controller';
import { CommonsService } from '../services/commons.service';
import {CommonSchema } from '../models/common'
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostCommon, RunSensitivities, RunSurgeSwab,
  RunHydraulics, DrawSchematic, GetCommon_designId, PutCommon_designId, 
  GetCommons, DeleteCommon_designId } from "../routes/commons-routes";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Common', schema: CommonSchema }],
  'torquedragclientdb')],
  controllers: [CommonsController],
  providers: [CommonsService]
})

export class CommonsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostCommon}`, method: RequestMethod.POST },
      { path: `${controller}/${RunSensitivities}`, method: RequestMethod.POST },
      { path: `${controller}/${RunSurgeSwab}`, method: RequestMethod.POST },
      { path: `${controller}/${RunHydraulics}`, method: RequestMethod.POST },
      { path: `${controller}/${DrawSchematic}`, method: RequestMethod.POST },
      { path: `${controller}/${GetCommon_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutCommon_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetCommons}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteCommon_designId}`, method: RequestMethod.DELETE },
    )
  }
}