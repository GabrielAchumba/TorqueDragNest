import { RigDTO } from "./rigDTO";
import { SimulationResultsDTO } from "./simulationResultsDTO";

export class SensitivityResultsDTO
{
    constructor() {
        this.simulationResultsDTOs = [];
    }
    
    rigDTO: RigDTO;
    simulationResultsDTOs:SimulationResultsDTO[];
}