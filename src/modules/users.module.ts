import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../controllers/users.controller';
import { UserSchema } from '../models/user';
import { UsersService } from '../services/users.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }],
  'torquedragclientdb')],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
