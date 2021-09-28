import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseHoleSectionsController } from 'src/controllers/baseholesections.controller';
import { BaseHoleSectionSchema } from 'src/models/baseholesection';
import { BaseHoleSectionsService } from 'src/services/baseholesections.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'BaseHoleSection', schema: BaseHoleSectionSchema }])],
  controllers: [BaseHoleSectionsController],
  providers: [BaseHoleSectionsService]
})
export class BaseHoleSectionsModule {}
