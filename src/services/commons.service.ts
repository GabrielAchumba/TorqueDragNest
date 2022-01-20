import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllInputsDTO } from '../dtos/allInputsDTO';
import { SchematicDTO } from '../dtos/schematicDTO ';
import { SensitivityResultsDTO } from '../dtos/sensitivityResultsDTO';
import { SimulationDTO } from '../dtos/simulationDTO';
import { WellSchematicsUtil } from '../schematicsanalysis/wellSchematicsUtil';
import { SurgeSwabSimulation } from '../surgeswab/surgeSwabSimulation';
import { TorqueDragSimulation } from '../torquedrag/torqueDragSimulation';
import { Common, CommonDocument } from '../models/common';

@Injectable()
export class CommonsService {
    constructor(@InjectModel('Common') private readonly commonModel: Model<CommonDocument>,) {

    }

    async create(common: Common): Promise<any> {
        
        const foundCommon = await this.commonModel.findOne (
            { "userId" : common.userId, "designId" : common.designId });
        
        if(foundCommon == null || foundCommon == undefined){
            const newCommon = new this.commonModel(common);
            return  newCommon.save();
        }else{
            const updatedCommon =
             await this.commonModel.updateOne({designId:common.designId},
                common, {new: true});
            return  common
        }
        
        return  foundCommon;
    }

   

    async findAll(): Promise<CommonDocument[]> {
        return this.commonModel.find().exec();
    }

    async findOne(designId: string): Promise<CommonDocument> {
        const common = await this.commonModel.findOne({designId: designId});

        if(!common){
            throw new NotFoundException("could not find common.")
        }

        console.log('common: ', common);
        return common;
    }

    async update(id: string, common: Common): Promise<CommonDocument> {
        const updatedCommon = await this.commonModel.findById(id);
        if(updatedCommon != null || updatedCommon != undefined){
            Object.assign(updatedCommon, common);
            updatedCommon.save();
        }

        return  updatedCommon;
    }

    async remove(id: string): Promise<void> {
        await this.commonModel.deleteOne({id}).exec();
    }

    async runSimulation(allInputsDTO:AllInputsDTO): Promise<SensitivityResultsDTO> {
        
        TorqueDragSimulation.allInputs = allInputsDTO;
        const result:SensitivityResultsDTO = TorqueDragSimulation.Run();
        return  result;
    }

    async runHydraulics(allInputsDTO:AllInputsDTO): Promise<SensitivityResultsDTO> {
        
        SurgeSwabSimulation.allInputs = allInputsDTO;
        const result = SurgeSwabSimulation.RunHydraulics();
        return  result;
    }

    async runSurgeSwab(allInputsDTO:AllInputsDTO): Promise<SensitivityResultsDTO> {
        
        SurgeSwabSimulation.allInputs = allInputsDTO;
        const result = SurgeSwabSimulation.RunSurgeSwab();
        return  result;
    }

    async runSensitivities(simulationDTO:SimulationDTO): Promise<SensitivityResultsDTO> {
        
        TorqueDragSimulation.allInputs = simulationDTO.allInputsDTO;
        TorqueDragSimulation.simulationDTO = simulationDTO;

        if(simulationDTO.isTDSensitivity == false)
        {
            var result = TorqueDragSimulation.Run();
        }
        else
        {
            var result = TorqueDragSimulation.RunSensitivities();
        }

        return  result;
    }


    async drawSchematic(allInputsDTO:AllInputsDTO): Promise<SchematicDTO> {
        
        WellSchematicsUtil.allInputs = allInputsDTO;
        const schematicDTO:SchematicDTO = WellSchematicsUtil.DrawSchematics();
        return  schematicDTO;
    }
}
