import { Injectable, NotFoundException } from "@nestjs/common";
import { APIDrillPipesService } from "./aPIDrillPipes.service";

@Injectable()
export class CatalogsService {
    constructor(private readonly aPIDrillPipesService:APIDrillPipesService) {

    }


    async saveSelectedTable(body: any): Promise<any> {

        let selectedDataTableName = body.selectedDataTableName as string;
        let response = {} as any;

        switch(selectedDataTableName){
            case "API Drill Pipes":
                response = await this.aPIDrillPipesService.create(body);
                break;
        } 

        return response;

    }

}