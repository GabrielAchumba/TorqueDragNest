import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt'; //genSaltSync
//import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User, UserDocument } from '../models/user';
import { Constants } from "../utilities/constants"

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>,) {

    }


    async login(user: User): Promise<any> {
        
        //console.log("user: ", user)

        const foundUser= await this.userModel.findOne(
        { "userName" : user.userName }).exec();

        let token = undefined
        if(foundUser){
            const passwordValid = await compare(user.password, foundUser.password)
            if(passwordValid){
                token = sign(
                    { userId: foundUser._id, userName: foundUser.userName },
                    Constants.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
            }
        }

        console.log("user: ", user);
        console.log("token: ", token);
        return  {user: foundUser, token}

       /*  if(foundUser){
            let token = undefined;
            this.comparePassword(user.password, foundUser.password,(err: Error, result: boolean) => {
                if(!err && result){
                        // Create token
                        token = sign(
                        { userId: foundUser._id, userName: foundUser.userName },
                        Constants.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                        );
        
                        console.log("user: ", user);
                        console.log("token: ", token);
                        return  {user: foundUser, token};
                }else{
                    return {user:foundUser, token }
                }
            })
        }
 */
    }

    async create(user: User): Promise<UserDocument> {
        console.log("create started")
        const foundUser = await this.userModel.findOne ({ "userName" : user.userName });
        
        if(foundUser == null || foundUser == undefined){

            //var salt = genSaltSync(10);
            const saltOrRounds = 10;
            const hashedPassword = await hash(user.password, saltOrRounds);
            user.password = hashedPassword;
            const newUser = new this.userModel(user);
            const createduser =  newUser.save();
            return createduser;
            
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
