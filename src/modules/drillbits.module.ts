import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DrillBitsController } from '../controllers/drillbits.controller';
import { DrillBitsService } from '../services/drillbits.service';
import { DrillBitSchema } from '../models/drillbit'
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostDrillBit, GetDrillBit_designId,
  PutDrillBit_designId, GetDrillBits, DeleteDrillBit_id }
  from "../routes/drillbits-routes";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DrillBit', schema: DrillBitSchema }],
  'torquedragclientdb')],
  controllers: [DrillBitsController],
  providers: [DrillBitsService]
})

export class DrillBitsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostDrillBit}`, method: RequestMethod.POST },
      { path: `${controller}/${GetDrillBit_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutDrillBit_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetDrillBits}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteDrillBit_id}`, method: RequestMethod.DELETE },
    )
  }
}
