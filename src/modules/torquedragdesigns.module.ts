import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TorqueDragDesignsController } from '../controllers/torquedragdesigns.controller';
import { TorqueDragDesignSchema } from '../models/torquedragdesign';
import { TorqueDragDesignsService } from '../services/torquedragdesigns.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'TorqueDragDesign', schema: TorqueDragDesignSchema }],
  'torquedragclientdb')],
  controllers: [TorqueDragDesignsController],
  providers: [TorqueDragDesignsService]
})
export class TorqueDragDesignsModule {}
