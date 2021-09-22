import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasePipesController } from 'src/controllers/basepipes.controller';
import { BaseHoleSectionSchema } from 'src/models/baseholesection';
import { BasePipesService } from 'src/services/basepipes.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BasePipe', schema: BaseHoleSectionSchema }])],
  controllers: [BasePipesController],
  providers: [BasePipesService]
})
export class BasePipesModule {}
