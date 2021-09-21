import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonsController } from '../controllers/commons.controller';
import { CommonsService } from '../services/commons.service';
import {CommonSchema } from '../models/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Common', schema: CommonSchema }])],
  controllers: [CommonsController],
  providers: [CommonsService]
})
export class CommonsModule {}
