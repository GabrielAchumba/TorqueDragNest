import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MudPVTsController } from 'src/controllers/mudpvts.controller';
import { MudPVTSchema } from 'src/models/mudpvt';
import { MudPVTsService } from 'src/services/mudpvts.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'MudPVT', schema: MudPVTSchema }])],
  controllers: [MudPVTsController],
  providers: [MudPVTsService]
})
export class MudPVTsModule {}
