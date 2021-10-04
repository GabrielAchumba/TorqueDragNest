import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DrillBitsController } from '../controllers/drillbits.controller';
import { DrillBitsService } from '../services/drillbits.service';
import { DrillBitSchema } from '../models/drillbit'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DrillBit', schema: DrillBitSchema }],
  'torquedragclientdb')],
  controllers: [DrillBitsController],
  providers: [DrillBitsService]
})
export class DrillBitsModule {}
