import { syncBuiltinESMExports } from "node:module";
import { Simulation } from "../models/simulation";
import { AllInputsDTO } from "./allInputsDTO";
import { CommonDTO } from "./commonDTO";

export class SimulationDTO extends CommonDTO
{
    simulations:Simulation[]
    userId:string;
    noOfSensitivities:number;
    sensitivityParameters:SensitivityParameters;
    allInputsDTO:AllInputsDTO;
    isTDSensitivity:boolean;
}


export class SensitivityParameters
{
   trippingIn_1:number
   trippingIn_2:number
   trippingIn_3:number
   trippingIn_4:number
   trippingIn_5:number
   trippingIn_6:number
   trippingIn_7:number
   trippingIn_8:number
   trippingIn_9:number
   trippingIn_10:number
   trippingOut_1:number
   trippingOut_2:number
   trippingOut_3:number
   trippingOut_4:number
   trippingOut_5:number
   trippingOut_6:number
   trippingOut_7:number
   trippingOut_8:number
   trippingOut_9:number
   trippingOut_10:number
   drilling_1:number
   drilling_2:number
   drilling_3:number
   drilling_4:number
   drilling_5:number
   drilling_6:number
   drilling_7:number
   drilling_8:number
   drilling_9:number
   drilling_10:number
   slideDrilling_1:number
   slideDrilling_2:number
   slideDrilling_3:number
   slideDrilling_4:number
   slideDrilling_5:number
   slideDrilling_6:number
   slideDrilling_7:number
   slideDrilling_8:number
   slideDrilling_9:number
   slideDrilling_10:number
   backReaming_1:number
   backReaming_2:number
   backReaming_3:number
   backReaming_4:number
   backReaming_5:number
   backReaming_6:number
   backReaming_7:number
   backReaming_8:number
   backReaming_9:number
   backReaming_10:number
   rotatingOffBottom_1:number
   rotatingOffBottom_2:number
   rotatingOffBottom_3:number
   rotatingOffBottom_4:number
   rotatingOffBottom_5:number
   rotatingOffBottom_6:number
   rotatingOffBottom_7:number
   rotatingOffBottom_8:number
   rotatingOffBottom_9:number
   rotatingOffBottom_10:number
}