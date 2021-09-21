import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatumsController } from '../controllers/datums.controller';
import { DatumsService } from '../services/datums.service';
import { DatumSchema } from '../models/datum'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Datum', schema: DatumSchema }])],
  controllers: [DatumsController],
  providers: [DatumsService]
})
export class DatumsModule {}
