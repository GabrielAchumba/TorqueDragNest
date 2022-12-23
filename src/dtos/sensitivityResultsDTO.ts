import { RigDTO } from "./rigDTO";
import { SimulationResultsDTO } from "./simulationResultsDTO";

export interface SensitivityResultsDTO {
    rigDTO: RigDTO;
    simulationResult_TrippingIns:SimulationResultsDTO[];
    simulationResult_TrippingOuts:SimulationResultsDTO[];
    simulationResult_Drillings:SimulationResultsDTO[];
    simulationResult_RotatingOffBottoms:SimulationResultsDTO[];
    simulationResult_SlideDrillings:SimulationResultsDTO[];
    simulationResult_Backreamings:SimulationResultsDTO[];
    simulationResultsDTOs:SimulationResultsDTO[];

    frictionnFactors_TrippingIns:string[];
    frictionnFactors_TrippingOuts:string[];
    frictionnFactors_Drillings:string[];
    frictionnFactors_RotatingOffBottoms:string[];
    frictionnFactors_SlideDrillings:string[];
    frictionnFactors_Backreamings:string[];
}
