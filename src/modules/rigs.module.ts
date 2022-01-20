import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RigsController } from '../controllers/rigs.controller';
import { RigSchema } from '../models/rig';
import { RigsService } from '../services/rigs.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rig', schema: RigSchema }],
  'torquedragclientdb')],
  controllers: [RigsController],
  providers: [RigsService]
})
export class RigsModule {}
