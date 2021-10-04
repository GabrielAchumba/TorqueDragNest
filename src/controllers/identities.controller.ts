import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Identity, IdentityDocument } from 'src/models/identity';
import { IdentitiesService } from 'src/services/identities.service';


@Controller('identities')
export class IdentitiesController {

    constructor(private readonly identitiesService: IdentitiesService) {

    }

    @Post('Login')
    async login(@Body() identity: Identity) {
        return await this.identitiesService.login(identity);
    }

    @Post('Logout')
    async logout(@Body() identity: Identity) {
        return await this.identitiesService.logout(identity);
    }


    @Post('PostIdentity')
    async create(@Body() identity: Identity) {
        return await this.identitiesService.create(identity);
    }

    @Get('GetIdentities/:id')
    findOne(@Param('id') id: string): Promise<IdentityDocument> {
        return this.identitiesService.findOne(id);
    }

    @Patch('PutIdentity/:id')
    update(@Param('id') id: string, @Body() identity: Identity) {
      return this.identitiesService.update(id, identity);
    }
  
    @Get('GetIdentities')
    async findAll(): Promise<IdentityDocument[]> {
        return this.identitiesService.findAll();
    }

    @Delete('DeleteIdentity/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.identitiesService.remove(id);
    } 
}
