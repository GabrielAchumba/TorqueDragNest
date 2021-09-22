import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TorqueDragDesignsController } from 'src/controllers/torquedragdesigns.controller';
import { TorqueDragDesignSchema } from 'src/models/torquedragdesign';
import { TorqueDragDesignsService } from 'src/services/torquedragdesigns.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'TorqueDragDesign', schema: TorqueDragDesignSchema }])],
  controllers: [TorqueDragDesignsController],
  providers: [TorqueDragDesignsService]
})
export class TorqueDragDesignsModule {}
