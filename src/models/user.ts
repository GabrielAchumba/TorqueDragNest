import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

//@ApiProperty({ enum: RoleEnum, default: [], isArray: true })

export class User {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    middleName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    companyName: string;
    @ApiProperty()
    roleName: string;
    @ApiProperty()
    jobDescription: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    userName: string;
    @ApiProperty()
    email: string;
}

export interface UserDocument extends mongoose.Document, User { }

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true },
    middleName: {type: String, required: false },
    lastName: {type: String, required: true },
    companyName: {type: String, required: true },
    roleName: {type: String, required: false },
    jobDescription: {type: String, required: false },
    password: {type: String, required: true },
    userName: {type: String, required: true },
    email: {type: String, required: false },
  });
