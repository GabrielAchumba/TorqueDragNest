import { Module } from "@nestjs/common";
import { CatalogsController } from "../controllers/catalogs.controller";
import { CatalogsService } from "../services/catalogs.service";
import { APIDrillPipesModule } from "./aPIDrillPipes.module";

@Module({
    imports: [
        APIDrillPipesModule
    ],
    controllers: [CatalogsController],
    providers: [CatalogsService],
  })
  export class CatalogsModule {}