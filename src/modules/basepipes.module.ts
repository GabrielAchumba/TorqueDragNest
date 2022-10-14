import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasePipesController } from '../controllers/basepipes.controller';
import { BasePipeSchema } from '../models/basepipe';
import { BasePipesService } from '../services/basepipes.service';
import { controller, PostPipes, GetPipes_designId, PutPipe_designId, GetPipes, DeletePipe_id } from
"../routes/basepipes-routes";
import { AuthMiddleware } from '../middlewares/authentication';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BasePipe', schema: BasePipeSchema }],
  'torquedragclientdb')],
  controllers: [BasePipesController],
  providers: [BasePipesService]
})

export class BasePipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostPipes}`, method: RequestMethod.POST },
      { path: `${controller}/${GetPipes_designId}`, method: RequestMethod.GET },
      { path: `${controller}/${PutPipe_designId}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetPipes}`, method: RequestMethod.GET },
      { path: `${controller}/${DeletePipe_id}`, method: RequestMethod.GET },
    )
  }
}
