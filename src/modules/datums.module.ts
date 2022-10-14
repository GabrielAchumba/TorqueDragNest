import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatumsController } from '../controllers/datums.controller';
import { DatumsService } from '../services/datums.service';
import { DatumSchema } from '../models/datum'
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostDatum, GetDatums_designId,
  PutDatum_id, GetDatums, DeleteDatum_id } from "../routes/datums-routes";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Datum', schema: DatumSchema }],
  'torquedragclientdb')],
  controllers: [DatumsController],
  providers: [DatumsService]
})

export class DatumsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostDatum}`, method: RequestMethod.POST },
      { path: `${controller}/${GetDatums_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutDatum_id}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetDatums}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteDatum_id}`, method: RequestMethod.DELETE },
    )
  }
}
