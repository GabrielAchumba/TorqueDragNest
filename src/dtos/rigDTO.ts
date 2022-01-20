import { Rig } from "../models/rig";
import { CommonDTO } from "./commonDTO";

export class RigDTO extends CommonDTO
{
    constructpr()
    {
        this.pumpPressures = [];
        this.pumpFlowRate = [];
        this.highPressures = [];
        this.optimumPressures = [];
        this.lowPressures = [];
    }
    
    userId:string;
    rig:Rig;
    lowPressures :number[];
    pumpPressures :number[];
    highPressures :number[];
    optimumPressures :number[];
    pumpFlowRate :number[];
    minimumPumpRate: number;
     maximumPumpRate :number
     minimumPumpPressure :number
     maximumPumpPressureD :number
     maximumPumpPressureB :number
     flowExponent :number
     maxHorsePower :number
     lowParasiticPressureLoss :number
     highParasiticPressureLoss :number
     flowRateLowPumpPressure :number
     flowRateHighPumpPressure :number
     optimunTotalNozzleArea :number
     mudDensity :number
     nozzleArea :number
     lowPressureDropThroughBit :number
     highPressureDropThroughBit :number
}