import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensitivityParametersService } from '../services/sensitivityParameters.service';
import { SensitivityParametersSchema } from '../models/sensitivityParameters';
import { SensitivityParametersController } from '../controllers/sensitivityParameters.controller';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostSensitivityParameters,
  GetSensitivityParameters_designId, GetSensitivityParameters,
  DeleteSensitivityParameters_designId } from "../routes/sensitivityParameters-routes";




@Module({
  imports: [MongooseModule.forFeature([{ name: 'SensitivityParameters', schema: SensitivityParametersSchema }],
  'torquedragclientdb')],
  controllers: [SensitivityParametersController],
  providers: [SensitivityParametersService]
})

export class SensitivityParametersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostSensitivityParameters}`, method: RequestMethod.POST },
      { path: `${controller}/${GetSensitivityParameters_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${GetSensitivityParameters}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteSensitivityParameters_designId}`, method: RequestMethod.DELETE },
    )
  }
}
