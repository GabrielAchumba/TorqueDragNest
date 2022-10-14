import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperationsController } from '../controllers/operations.controller';
import { OperationSchema } from '../models/operation';
import { OperationsService } from '../services/operations.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostOperation, GetOperation_designId,
  PutOperation_designId, GetOperations, DeleteOperation_designId } from "../routes/operations-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }],
  'torquedragclientdb')],
  controllers: [OperationsController],
  providers: [OperationsService]
})

export class OperationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostOperation}`, method: RequestMethod.POST },
      { path: `${controller}/${GetOperation_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutOperation_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetOperations}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteOperation_designId}`, method: RequestMethod.DELETE },
    )
  }
}
