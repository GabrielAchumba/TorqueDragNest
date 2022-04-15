import { syncBuiltinESMExports } from "node:module";
import { SensitivityParameters } from "../models/sensitivityParameters";
import { Simulation } from "../models/simulation";
import { AllInputsDTO } from "./allInputsDTO";
import { CommonDTO } from "./commonDTO";

export class SimulationDTO extends CommonDTO
{
    simulations:Simulation[]
    userId:string;
    sensitivityParameters:SensitivityParameters;
    allInputsDTO:AllInputsDTO;
    isTDSensitivity:boolean;
}
