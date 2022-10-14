import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MudPVTsController } from '../controllers/mudpvts.controller';
import { MudPVTSchema } from '../models/mudpvt';
import { MudPVTsService } from '../services/mudpvts.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostMudPVTs, GetMudPVTs_designId,
  PutMudPVT_designId, GetMudPVTs, DeleteMudPVT_designId } from "../routes/mudpvts-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'MudPVT', schema: MudPVTSchema }],
  'torquedragclientdb')],
  controllers: [MudPVTsController],
  providers: [MudPVTsService]
})

export class MudPVTsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostMudPVTs}`, method: RequestMethod.POST },
      { path: `${controller}/${GetMudPVTs_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutMudPVT_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetMudPVTs}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteMudPVT_designId}`, method: RequestMethod.DELETE },
    )
  }
}
