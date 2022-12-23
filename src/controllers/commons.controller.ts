import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommonsService } from '../services/commons.service';
import { Common, CommonDocument } from '../models/common';
import { AllInputsDTO } from '../dtos/allInputsDTO';
import { SimulationDTO } from '../dtos/simulationDTO';
import { TorqueDragSimulation } from '../torquedrag/torqueDragSimulation';
import { WellSchematicsUtil } from '../schematicsanalysis/wellSchematicsUtil';
import { SurgeSwabSimulation  } from '../surgeswab/surgeSwabSimulation';
import { controller, PostCommon, RunSensitivities, RunSurgeSwab,
    RunHydraulics, DrawSchematic, GetCommon_designId, PutCommon_designId, 
    GetCommons, DeleteCommon_designId } from "../routes/commons-routes";

@Controller(controller)
export class CommonsController {

    constructor(private readonly commonsService: CommonsService) {

    }

    @Post(PostCommon)
    async create(@Body() common: Common) {
        console.log("common: ", common)
        return await this.commonsService.create(common);
    }

    @Post(RunSensitivities)
    async runSensitivities(@Body() simulationDTO:SimulationDTO) {
        const torqueDragSimulation = {...TorqueDragSimulation}
        torqueDragSimulation.Initialize(simulationDTO)
        console.log("runSensitivities called");
        const response = await torqueDragSimulation.RunSensitivities()
        //this.commonsService.runSensitivities(simulationDTO);
        return response;
    }

    @Post(RunSurgeSwab)
    async runSurgeSwab(@Body() allInputsDTO: AllInputsDTO) {
        const surgeSwabSimulation = {...SurgeSwabSimulation}
        surgeSwabSimulation.Initialize(allInputsDTO);
        const response = await surgeSwabSimulation.RunSurgeSwab();
        return response;
    }

    @Post(RunHydraulics)
    async runHydraulics(@Body() allInputsDTO: AllInputsDTO) {
        const surgeSwabSimulation = {...SurgeSwabSimulation}
        surgeSwabSimulation.Initialize(allInputsDTO);
        const response = await surgeSwabSimulation.RunHydraulics();
        return response;
    }

    @Post(DrawSchematic)
    async drawSchematic(@Body() allInputsDTO:AllInputsDTO) {
        WellSchematicsUtil.allInputs = allInputsDTO;
        const response = await WellSchematicsUtil.DrawSchematics()
        return response;
    }


    @Get(GetCommon_designId)
    findOne(@Param('designId') designId: string): Promise<CommonDocument> {
        return this.commonsService.findOne(designId);
    }

    @Patch(PutCommon_designId)
    update(@Param('designId') designId: string, @Body() common: Common) {
      return this.commonsService.update(designId, common);
    }
  
    @Get(GetCommons)
    async findAll(): Promise<CommonDocument[]> {
        return this.commonsService.findAll();
    }

    @Delete(DeleteCommon_designId)
    remove(@Param('designId') designId: string): Promise<void> {
        return this.commonsService.remove(designId);
    } 
}
