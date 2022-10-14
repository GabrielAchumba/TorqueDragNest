import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Identity, IdentityDocument } from '../models/identity';
import { IdentitiesService } from '../services/identities.service';
import { controller, Login, Logout, PostIdentity, GetIdentities_id,
    PutIdentity_id, GetIdentities, DeleteIdentity_id } from "../routes/identities-routes";


@Controller(controller)
export class IdentitiesController {

    constructor(private readonly identitiesService: IdentitiesService) {

    }

    @Post(Login)
    async login(@Body() identity: Identity) {
        return await this.identitiesService.login(identity);
    }

    @Post(Logout)
    async logout(@Body() identity: Identity) {
        return await this.identitiesService.logout(identity);
    }


    @Post(PostIdentity)
    async create(@Body() identity: Identity) {
        return await this.identitiesService.create(identity);
    }

    @Get(GetIdentities_id)
    findOne(@Param('id') id: string): Promise<IdentityDocument> {
        return this.identitiesService.findOne(id);
    }

    @Patch(PutIdentity_id)
    update(@Param('id') id: string, @Body() identity: Identity) {
      return this.identitiesService.update(id, identity);
    }
  
    @Get(GetIdentities)
    async findAll(): Promise<IdentityDocument[]> {
        return this.identitiesService.findAll();
    }

    @Delete(DeleteIdentity_id)
    remove(@Param('id') id: string): Promise<void> {
        return this.identitiesService.remove(id);
    } 
}
