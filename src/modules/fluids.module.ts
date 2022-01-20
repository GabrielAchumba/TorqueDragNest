import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FluidsController } from '../controllers/fluids.controller';
import { FluidSchema } from '../models/fluid';
import { FluidsService } from '../services/fluilds.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fluid', schema: FluidSchema }],
  'torquedragclientdb')],
  controllers: [FluidsController],
  providers: [FluidsService]
})
export class FluidsModule {}
