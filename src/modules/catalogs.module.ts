import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatalogsController } from "../controllers/catalogs.controller";
import { CatalogsService } from "../services/catalogs.service";
import { APIDrillPipesModule } from "./aPIDrillPipes.module";
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, SaveSelectedTable } from "../routes/catalogs-routes";

@Module({
    imports: [
        APIDrillPipesModule
    ],
    controllers: [CatalogsController],
    providers: [CatalogsService],
  })

  export class CatalogsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware)
      .forRoutes(
        { path: `${controller}/${SaveSelectedTable}`, method: RequestMethod.POST }
      )
    }
  }