import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommonsService } from '../services/commons.service';
import { Common, CommonDocument } from '../models/common';
import { AllInputsDTO } from '../dtos/allInputsDTO';
import { SimulationDTO } from '../dtos/simulationDTO';
import { TorqueDragSimulation } from '../torquedrag/torqueDragSimulation';
import { WellSchematicsUtil } from '../schematicsanalysis/wellSchematicsUtil';
import { SurgeSwabSimulation  } from '../surgeswab/surgeSwabSimulation';

@Controller('Commons')
export class CommonsController {

    constructor(private readonly commonsService: CommonsService) {

    }

    @Post('PostCommon')
    async create(@Body() common: Common) {
        return await this.commonsService.create(common);
    }

    @Post('RunSensitivities')
    async runSensitivities(@Body() simulationDTO:SimulationDTO) {
        TorqueDragSimulation.simulationDTO = simulationDTO;
        TorqueDragSimulation.allInputs = simulationDTO.allInputsDTO;
        const response = await TorqueDragSimulation.Run()
        //this.commonsService.runSensitivities(simulationDTO);
        return response;
    }

    @Post('RunSurgeSwab')
    async runSurgeSwab(@Body() allInputsDTO: AllInputsDTO) {
        SurgeSwabSimulation.allInputs = allInputsDTO;
        const response = await SurgeSwabSimulation.RunSurgeSwab();
        return response;
    }

    @Post('RunHydraulics')
    async runHydraulics(@Body() allInputsDTO: AllInputsDTO) {
        SurgeSwabSimulation.allInputs = allInputsDTO;
        const response = await SurgeSwabSimulation.RunHydraulics();
        return response;
    }

    @Post('DrawSchematic')
    async drawSchematic(@Body() allInputsDTO:AllInputsDTO) {
        WellSchematicsUtil.allInputs = allInputsDTO;
        const response = await WellSchematicsUtil.DrawSchematics()
        return response;
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
