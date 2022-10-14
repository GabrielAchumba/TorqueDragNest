import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APIDrillPipesService } from '../services/aPIDrillPipes.service';
import { APIDrillPipesController } from '../controllers/aPIDrillPipes.controller';
import { APIDrillPipeSchema } from '../models/aPIDrillPipes';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, PostAPIDrillPipes, GetAPIDrillPipes_companyName, GetAPIDrillPipes, DeleteAPIDrillPipe_designId } from
"../routes/aPIDrillPipes-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'APIDrillPipe', schema: APIDrillPipeSchema }],
  'torquedragclientdb')],
  controllers: [APIDrillPipesController],
  providers: [APIDrillPipesService],
  exports: [APIDrillPipesService]
})

export class APIDrillPipesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${PostAPIDrillPipes}`, method: RequestMethod.POST },
      { path: `${controller}/${GetAPIDrillPipes_companyName}`, method: RequestMethod.PUT },
      { path: `${controller}/${GetAPIDrillPipes}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteAPIDrillPipe_designId}`, method: RequestMethod.DELETE },
    )
  }
}
