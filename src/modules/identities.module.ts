import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitiesController } from '../controllers/identities.controller';
import { IdentitySchema } from '../models/identity';
import { IdentitiesService } from '../services/identities.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }],
  'torquedragmasterdb')],
  controllers: [IdentitiesController],
  providers: [IdentitiesService]
})
export class IdentitiesModule {}
