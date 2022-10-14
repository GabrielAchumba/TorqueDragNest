import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FluidsController } from '../controllers/fluids.controller';
import { FluidSchema } from '../models/fluid';
import { FluidsService } from '../services/fluilds.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostFluid, GetFluid_designId,
  PutFluid_designId, GetFluids, DeleteFluid_id } from "../routes/fluids-routes";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fluid', schema: FluidSchema }],
  'torquedragclientdb')],
  controllers: [FluidsController],
  providers: [FluidsService]
})

export class FluidsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostFluid}`, method: RequestMethod.POST },
      { path: `${controller}/${GetFluid_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutFluid_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetFluids}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteFluid_id}`, method: RequestMethod.DELETE },
    )
  }
}
