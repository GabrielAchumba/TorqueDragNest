import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from '../middlewares/authentication';
import { UsersController } from '../controllers/users.controller';
import { UserSchema } from '../models/user';
import { UsersService } from '../services/users.service';
import { controller, GetUsers_id, PutUser_id, GetUsers, DeleteUser_id } from "../routes/user-routes"



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }],
  'torquedragclientdb')],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes(
      { path: `${controller}/${GetUsers_id}`, method: RequestMethod.GET },
      { path: `${controller}/${PutUser_id}`, method: RequestMethod.PATCH },
      { path: `${controller}/${GetUsers}`, method: RequestMethod.GET },
      { path: `${controller}/${DeleteUser_id}`, method: RequestMethod.DELETE },
    )
  }
}

