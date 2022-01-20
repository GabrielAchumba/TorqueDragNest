import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User, UserDocument } from '../models/user';
import { UsersService } from '../services/users.service';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Post('Login')
    async login(@Body() user: User) {
        return await this.usersService.login(user);
    }

    @Post('PostUser')
    async create(@Body() user: User) {
        await this.usersService.create(user);
    }

    @Get('GetUsers/:id')
    findOne(@Param('id') id: string): Promise<UserDocument> {
        return this.usersService.findOne(id);
    }

    @Patch('PutUser/:id')
    update(@Param('id') id: string, @Body() rig: User) {
      return this.usersService.update(id, rig);
    }
  
    @Get('GetUsers')
    async findAll(): Promise<UserDocument[]> {
        return this.usersService.findAll();
    }

    @Delete('DeleteUser/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    } 
}
