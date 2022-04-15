import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APIDrillPipesService } from '../services/aPIDrillPipes.service';
import { APIDrillPipesController } from '../controllers/aPIDrillPipes.controller';
import { APIDrillPipeSchema } from '../models/aPIDrillPipes';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'APIDrillPipe', schema: APIDrillPipeSchema }],
  'torquedragclientdb')],
  controllers: [APIDrillPipesController],
  providers: [APIDrillPipesService],
  exports: [APIDrillPipesService]
})
export class APIDrillPipesModule {}
