import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,) {

    }

    async login(user: User): Promise<UserDocument> {
        
        console.log("user:", user);

        const foundUser= await this.userModel.findOne(
        { "userName" : user.userName, "password" : user.password }).exec();
        
        console.log("foundUser:", foundUser);
        return  foundUser;
    }

    async create(user: User): Promise<UserDocument> {
        
        const foundUser = await this.userModel.findOne ({ "userName" : user.userName });
        
        if(foundUser == null || foundUser == undefined){
            const newUser = new this.userModel(user);
            return  newUser.save();
        }
        
        return  foundUser;
    }

   

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException("could not find user.")
        }

        return user;
    }

    async update(id: string, user: User): Promise<UserDocument> {
        const updatedUser = await this.userModel.findById(id);
        if(updatedUser != null || updatedUser != undefined){
            Object.assign(updatedUser, user);
            updatedUser.save();
        }

        return  updatedUser;
    }

    async remove(id: string): Promise<void> {
        await this.userModel.deleteOne({id}).exec();
    }
}
