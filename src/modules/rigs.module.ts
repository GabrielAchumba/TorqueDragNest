import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RigsController } from 'src/controllers/rigs.controller';
import { RigSchema } from 'src/models/rig';
import { RigsService } from 'src/services/rigs.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rig', schema: RigSchema }],
  'torquedragclientdb')],
  controllers: [RigsController],
  providers: [RigsService]
})
export class RigsModule {}
