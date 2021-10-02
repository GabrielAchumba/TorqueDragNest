import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommonsService } from '../services/commons.service';
import { Common, CommonDocument } from '../models/common';
import { AllInputsDTO } from 'src/dtos/allInputsDTO';
import { SimulationDTO } from 'src/dtos/simulationDTO';

@Controller('commons')
export class CommonsController {

    constructor(private readonly commonsService: CommonsService) {

    }

    @Post('PostCommon')
    async create(@Body() common: Common) {
        await this.commonsService.create(common);
    }

    @Post('RunSimulation')
    async runSimulation(@Body() allInputsDTO: AllInputsDTO) {
        await this.commonsService.runSimulation(allInputsDTO);
    }

    @Post('RunHydraulics')
    async runHydraulics(@Body() allInputsDTO: AllInputsDTO) {
        await this.commonsService.runHydraulics(allInputsDTO);
    }

    @Post('RunSurgeSwab')
    async runSurgeSwab(@Body() allInputsDTO: AllInputsDTO) {
        await this.commonsService.runSurgeSwab(allInputsDTO);
    }

    @Post('RunSensitivities')
    async runSensitivities(@Body() simulationDTO:SimulationDTO) {
        await this.commonsService.runSensitivities(simulationDTO);
    }

    @Post('DrawSchematic')
    async drawSchematic(@Body() allInputsDTO:AllInputsDTO) {
        await this.commonsService.drawSchematic(allInputsDTO);
    }


    @Get('GetCommons/:id')
    findOne(@Param('id') id: string): Promise<CommonDocument> {
        return this.commonsService.findOne(id);
    }

    @Patch('PutCommon/:id')
    update(@Param('id') id: string, @Body() common: Common) {
      return this.commonsService.update(id, common);
    }
  
    @Get('GetCommons')
    async findAll(): Promise<CommonDocument[]> {
        return this.commonsService.findAll();
    }

    @Delete('DeleteCommon/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.commonsService.remove(id);
    } 
}
