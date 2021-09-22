import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperationsController } from 'src/controllers/operations.controller';
import { OperationSchema } from 'src/models/operation';
import { OperationsService } from 'src/services/operations.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Operation', schema: OperationSchema }])],
  controllers: [OperationsController],
  providers: [OperationsService]
})
export class OperationsModule {}
