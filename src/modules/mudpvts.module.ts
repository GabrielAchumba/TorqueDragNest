import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MudPVTsController } from '../controllers/mudpvts.controller';
import { MudPVTSchema } from '../models/mudpvt';
import { MudPVTsService } from '../services/mudpvts.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'MudPVT', schema: MudPVTSchema }],
  'torquedragclientdb')],
  controllers: [MudPVTsController],
  providers: [MudPVTsService]
})
export class MudPVTsModule {}
