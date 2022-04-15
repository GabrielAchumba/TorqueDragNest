import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CatalogsService } from '../services/catalogs.service';

@Controller('Catalogs')
export class CatalogsController {

    constructor(private readonly catalogsService: CatalogsService) {

    }

    @Post('SaveSelectedTable')
    async SaveSelectedTable(@Body() body: any) {
        await this.catalogsService.saveSelectedTable(body);
    }
}
