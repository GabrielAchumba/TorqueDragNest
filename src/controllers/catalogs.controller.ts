import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CatalogsService } from '../services/catalogs.service';
import { controller, SaveSelectedTable } from "../routes/catalogs-routes";

@Controller(controller)
export class CatalogsController {

    constructor(private readonly catalogsService: CatalogsService) {

    }

    @Post(SaveSelectedTable)
    async SaveSelectedTable(@Body() body: any) {
        await this.catalogsService.saveSelectedTable(body);
    }
}
