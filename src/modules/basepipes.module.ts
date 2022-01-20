import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasePipesController } from '../controllers/basepipes.controller';
import { BasePipeSchema } from '../models/basepipe';
import { BasePipesService } from '../services/basepipes.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BasePipe', schema: BasePipeSchema }],
  'torquedragclientdb')],
  controllers: [BasePipesController],
  providers: [BasePipesService]
})
export class BasePipesModule {}
