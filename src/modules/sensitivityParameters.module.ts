import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensitivityParametersService } from '../services/sensitivityParameters.service';
import { SensitivityParametersSchema } from '../models/sensitivityParameters';
import { SensitivityParametersController } from '../controllers/sensitivityParameters.controller';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'SensitivityParameters', schema: SensitivityParametersSchema }],
  'torquedragclientdb')],
  controllers: [SensitivityParametersController],
  providers: [SensitivityParametersService]
})
export class SensitivityParametersModule {}
