import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitiesController } from 'src/controllers/identities.controller';
import { IdentitySchema } from 'src/models/identity';
import { IdentitiesService } from 'src/services/identities.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }],
  'torquedragmasterdb')],
  controllers: [IdentitiesController],
  providers: [IdentitiesService]
})
export class IdentitiesModule {}
