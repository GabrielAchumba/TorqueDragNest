import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdentitiesController } from '../controllers/identities.controller';
import { IdentitySchema } from '../models/identity';
import { IdentitiesService } from '../services/identities.service';
import { AuthMiddleware } from '../middlewares/authentication';
import { controller, Login, Logout, PostIdentity, GetIdentities_id,
  PutIdentity_id, GetIdentities, DeleteIdentity_id } from "../routes/identities-routes";


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Identity', schema: IdentitySchema }],
  'torquedragmasterdb')],
  controllers: [IdentitiesController],
  providers: [IdentitiesService]
})

export class IdentitiesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${Logout}`, method: RequestMethod.POST },
      { path: `${controller}/${GetIdentities_id}`, method: RequestMethod.GET },
      { path: `${controller}/${PutIdentity_id}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetIdentities}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteIdentity_id}`, method: RequestMethod.DELETE },
    )
  }
}
