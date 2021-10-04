import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FluidsController } from 'src/controllers/fluids.controller';
import { FluidSchema } from 'src/models/fluid';
import { FluidsService } from 'src/services/fluilds.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fluid', schema: FluidSchema }],
  'torquedragclientdb')],
  controllers: [FluidsController],
  providers: [FluidsService]
})
export class FluidsModule {}
