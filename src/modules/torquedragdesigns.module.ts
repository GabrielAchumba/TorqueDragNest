import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TorqueDragDesignsController } from '../controllers/torquedragdesigns.controller';
import { TorqueDragDesignSchema } from '../models/torquedragdesign';
import { TorqueDragDesignsService } from '../services/torquedragdesigns.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller,  GetTorqueDragDesigns, PostSelectedWellDesign,
  GetWellDesignsByUserId_id, PostTorqueDragDesign, PutTorqueDragDesign_id,
  DeleteTorqueDragDesign_id } from "../routes/torquedragdesigns-routes";



@Module({
  imports: [MongooseModule.forFeature([{ name: 'TorqueDragDesign', schema: TorqueDragDesignSchema }],
  'torquedragclientdb')],
  controllers: [TorqueDragDesignsController],
  providers: [TorqueDragDesignsService]
})

export class TorqueDragDesignsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${GetTorqueDragDesigns}`, method: RequestMethod.GET },
      { path: `${controller}/${PostSelectedWellDesign}`, method: RequestMethod.POST },
      { path: `${controller}/${GetWellDesignsByUserId_id}`, method: RequestMethod.GET },
      { path: `${controller}/${PostTorqueDragDesign}`, method: RequestMethod.POST },
      { path: `${controller}/${PutTorqueDragDesign_id}`, method: RequestMethod.PUT },
      { path: `${controller}/${DeleteTorqueDragDesign_id}`, method: RequestMethod.DELETE },
    )
  }
}
