import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseHoleSectionsController } from '../controllers/baseholesections.controller';
import { BaseHoleSectionSchema } from '../models/baseholesection';
import { BaseHoleSectionsService } from '../services/baseholesections.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BaseHoleSection', schema: BaseHoleSectionSchema }],
  'torquedragclientdb')],
  controllers: [BaseHoleSectionsController],
  providers: [BaseHoleSectionsService]
})
export class BaseHoleSectionsModule {}
