import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommonsService } from '../services/commons.service';
import { Common, CommonDocument } from '../models/common';
import { AllInputsDTO } from 'src/dtos/allInputsDTO';
import { SimulationDTO } from 'src/dtos/simulationDTO';

@Controller('Commons')
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


    @Get('GetCommon/:designId')
    findOne(@Param('designId') designId: string): Promise<CommonDocument> {
        return this.commonsService.findOne(designId);
    }

    @Patch('PutCommon/:designId')
    update(@Param('designId') designId: string, @Body() common: Common) {
      return this.commonsService.update(designId, common);
    }
  
    @Get('GetCommons')
    async findAll(): Promise<CommonDocument[]> {
        return this.commonsService.findAll();
    }

    @Delete('DeleteCommon/:designId')
    remove(@Param('designId') designId: string): Promise<void> {
        return this.commonsService.remove(designId);
    } 
}
