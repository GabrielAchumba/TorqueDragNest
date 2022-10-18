import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User, UserDocument } from '../models/user';
import { UsersService } from '../services/users.service';
import { controller, Login, PostUser,
    GetUsers_id, PutUser_id, GetUsers, DeleteUser_id } from "../routes/user-routes";


@Controller(controller)
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Post(Login)
    async login(@Body() user: User) {
        return await this.usersService.login(user);
    }

    @Post(PostUser)
    async create(@Body() user: User) {
        console.log("user: ", user);
        return await this.usersService.create(user);
    }

    @Get(GetUsers_id)
    findOne(@Param('id') id: string): Promise<UserDocument> {
        return this.usersService.findOne(id);
    }

    @Patch(PutUser_id)
    update(@Param('id') id: string, @Body() rig: User) {
      return this.usersService.update(id, rig);
    }
  
    @Get(GetUsers)
    async findAll(): Promise<UserDocument[]> {
        return this.usersService.findAll();
    }

    //197.211.58.183/32

    //Elastic IP address 52.89.220.224

    @Delete(DeleteUser_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    } 
}
