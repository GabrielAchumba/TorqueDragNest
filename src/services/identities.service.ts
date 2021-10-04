import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity, IdentityDocument } from 'src/models/identity';

@Injectable()
export class IdentitiesService {
    constructor(@InjectModel('Identity') private readonly identityModel: Model<IdentityDocument>,) {

    }

    async login(identity: Identity): Promise<IdentityDocument> {
        
        const foundIdentity = await this.identityModel.findOne(
        { "userName" : identity.userName, "password" : identity.password }).exec();
        
        console.log("foundIdentity:", foundIdentity);
        return  foundIdentity;
    }

    
    async logout(identity: Identity): Promise<IdentityDocument> {
        
        const foundIdentity = await this.identityModel.findOne(
        { "userName" : identity.userName, "password" : identity.password }).exec();
        
        return  foundIdentity;
    }

    async create(identity: Identity): Promise<IdentityDocument> {
        
        const foundIdentity = await this.identityModel.findOne ({ "userName" : identity.userName });
        
        if(foundIdentity == null || foundIdentity == undefined){
            const newIdentity = new this.identityModel(identity);
            return  newIdentity.save();
        }
        
        return  foundIdentity;
    }

   

    async findAll(): Promise<IdentityDocument[]> {
        return this.identityModel.find().exec();
    }

    async findOne(id: string): Promise<IdentityDocument> {
        const identity = await this.identityModel.findById(id);

        if(!identity){
            throw new NotFoundException("could not find identity.")
        }

        return identity;
    }

    async update(id: string, identity: Identity): Promise<IdentityDocument> {
        const updatedIdentity = await this.identityModel.findById(id);
        if(updatedIdentity != null || updatedIdentity != undefined){
            Object.assign(updatedIdentity, identity);
            updatedIdentity.save();
        }

        return  updatedIdentity;
    }

    async remove(id: string): Promise<void> {
        await this.identityModel.deleteOne({id}).exec();
    }
}
