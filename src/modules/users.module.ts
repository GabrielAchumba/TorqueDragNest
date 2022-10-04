import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from '../middlewares/authentication';
import { UsersController } from '../controllers/users.controller';
import { UserSchema } from '../models/user';
import { UsersService } from '../services/users.service';



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
      { path: 'users/GetUsers/:id', method: RequestMethod.GET },
      { path: 'users/PutUser/:id', method: RequestMethod.PUT },
      { path: 'users/GetUsers', method: RequestMethod.GET },
      { path: 'users/DeleteUser/:id', method: RequestMethod.DELETE }
    )
  }
}
