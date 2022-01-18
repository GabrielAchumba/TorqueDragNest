import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasePipesController } from 'src/controllers/basepipes.controller';
import { BasePipeSchema } from 'src/models/basepipe';
import { BasePipesService } from 'src/services/basepipes.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BasePipe', schema: BasePipeSchema }],
  'torquedragclientdb')],
  controllers: [BasePipesController],
  providers: [BasePipesService]
})
export class BasePipesModule {}
