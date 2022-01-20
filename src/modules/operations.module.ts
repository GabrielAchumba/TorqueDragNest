import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperationsController } from '../controllers/operations.controller';
import { OperationSchema } from '../models/operation';
import { OperationsService } from '../services/operations.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }],
  'torquedragclientdb')],
  controllers: [OperationsController],
  providers: [OperationsService]
})
export class OperationsModule {}
