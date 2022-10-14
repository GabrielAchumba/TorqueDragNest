import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RigsController } from '../controllers/rigs.controller';
import { RigSchema } from '../models/rig';
import { RigsService } from '../services/rigs.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostRig, GetRig_designId,
  PutRig_designId, GetRigs, DeleteRig_designId } from "../routes/rigs-routes";



@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rig', schema: RigSchema }],
  'torquedragclientdb')],
  controllers: [RigsController],
  providers: [RigsService]
})

export class RigsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostRig}`, method: RequestMethod.POST },
      { path: `${controller}/${GetRig_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutRig_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetRigs}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteRig_designId}`, method: RequestMethod.DELETE },
    )
  }
}
