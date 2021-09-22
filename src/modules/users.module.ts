import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controllers/users.controller';
import { UserSchema } from 'src/models/user';
import { UsersService } from 'src/services/users.service';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
