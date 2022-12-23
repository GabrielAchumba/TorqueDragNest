import { AllInputsDTO } from "../dtos/allInputsDTO";
import { SensitivityResultsDTO } from "../dtos/sensitivityResultsDTO";
import { SimulationDTO } from "../dtos/simulationDTO";
import { SimulationResultsDTO } from "../dtos/simulationResultsDTO";
import { Sorting } from "../mathematics/sorting";
import { Pipe } from "../models/basepipe";
import { DevSurveyUtils } from "../schematicsanalysis/devSurveyUtils";
import { PipeUtils } from "../schematicsanalysis/pipeUtils";
import { BackReaming } from "./backReaming";
import { RotatingOffBottom } from "./rotatingOffBottom";
import { RotatingOnBottom } from "./rotatingOnBottom";
import { SlideDrilling } from "./slideDrilling";
import { TorqueDragBaseOperation } from "./torqueDragBaseOperation";
import { TrippingIn } from "./trippingIn";
import { TrippingOut } from "./trippingOut";

export const TorqueDragSimulation  = {
  
    allInputs:AllInputsDTO,
    simulationDTO:SimulationDTO,

    Initialize(simulationDTO:SimulationDTO){
        this.allInputs = simulationDTO.allInputsDTO;
        this.simulationDTO = simulationDTO;
    },

    RunSensitivities():SensitivityResultsDTO{
        console.log("this.simulationDTO.sensitivityParameters: ", this.simulationDTO.sensitivityParameters)
        if(this.simulationDTO.sensitivityParameters.isTDSensitivity === undefined){
            return this.RunNonSensitivities();
        }
        
        if(this.simulationDTO.sensitivityParameters.isTDSensitivity){
            return this._RunSensitivities();
        }else{
            return this.RunNonSensitivities();
        }
    },

    _RunSensitivities():SensitivityResultsDTO {
        const doglegSeverityMethod:string = "Lubrinski", bucklingMethod:string = "Inclined";

        const DevSurveyMD:number[] = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const DevSurveyInclination:number[]= DevSurveyUtils.GetDevSurveyInclinations(this.allInputs.deviationSurveys);

        const DevSurveyAzimuth:number[] = DevSurveyUtils.GetDevSurveyAzimuths(this.allInputs.deviationSurveys);

        const DevSurveyTVD:number[] = DevSurveyUtils.GetDevSurveyTVDs(this.allInputs.deviationSurveys);

        const DevSurveyVerticalDisplacement:number[] = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const DevSurveyDogLegs:number[] = DevSurveyUtils.GetDevSurveyDogLeg(this.allInputs.deviationSurveys);

        const LastMDHole:number = this.allInputs.holeSections[this.allInputs.holeSections.length - 1].bottomOfHole;

        console.log("seen 1")

        this.allInputs.pipes = Sorting.SortListofPipeReversed(this.allInputs.pipes);
        console.log("seen 2")

        const {_pipes, _isJoints} = PipeUtils.GetPipeDecrementsNew(this.allInputs.pipes, this.allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);

                                        console.log("seen 3")
        const sortedPipeIncrements:Pipe[] = Sorting.SortListofPipeReversed(_pipes);




        //List<double> DevSurveyDogLegSeverities = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        if (this.allInputs.operation.torqueAtBitDrillingOperation == null)
        this.allInputs.operation.torqueAtBitDrillingOperation = 0;

        if (this.allInputs.operation.torqueAtBit == null)
        this.allInputs.operation.torqueAtBit = 0;

        if (this.allInputs.operation.torqueAtBitBackReaming == null)
        this.allInputs.operation.torqueAtBitBackReaming = 0;

        if (this.allInputs.operation.weightOnBit == null)
        this.allInputs.operation.weightOnBit = 0;

        if (this.allInputs.operation.weightOnBitIDHM == null)
        this.allInputs.operation.weightOnBitIDHM = 0;

        const { weakeastTensileStrenth, baseOperationResults } 
        = TorqueDragBaseOperation.RunBaseOperation(sortedPipeIncrements,
            this.allInputs.holeSections, doglegSeverityMethod,
            this.allInputs.mudPVTs, this.allInputs.common);

            console.log("seen 4")

        let sensitivityResultsDTO = {} as SensitivityResultsDTO;
        let simulationResult_TrippingIns:SimulationResultsDTO[] = [];
        let simulationResult_TrippingOuts:SimulationResultsDTO[] = [];
        let simulationResult_Drillings:SimulationResultsDTO[] = [];
        let simulationResult_RotatingOffBottoms:SimulationResultsDTO[] = [];
        let simulationResult_SlideDrillings:SimulationResultsDTO[] = [];
        let simulationResult_Backreamings:SimulationResultsDTO[] = [];
        let simulationResultsDTO = {} as SimulationResultsDTO;

        const noOfSensitivities:number = this.simulationDTO.sensitivityParameters.noOfSensitivities;
        simulationResult_TrippingIns = [];
        let i = 0;
        let min = 0;
        let max = 0;
        let mid = 0;
        let min_op = 0;
        let max_op = 0;
        let mid_op = 0;
        let frictionFactors_Casing = [] as number[];
        let frictionFactors_OpenHole = [] as number[];
        let texts = [] as string[];
        let texts2 = [] as string[];
        sensitivityResultsDTO.frictionnFactors_TrippingIns = [];
        sensitivityResultsDTO.frictionnFactors_TrippingOuts = [];
        sensitivityResultsDTO.frictionnFactors_Drillings = [];
        sensitivityResultsDTO.frictionnFactors_RotatingOffBottoms = [];
        sensitivityResultsDTO.frictionnFactors_SlideDrillings = [];
        sensitivityResultsDTO.frictionnFactors_Backreamings = [];

        texts = this.simulationDTO.sensitivityParameters.trippingIn_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.trippingIn_2.split("-");
        console.log("texts2: ", texts2)
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_TrippingIns.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_TrippingIns.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_TrippingIns.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_TrippingIns.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isTrippingInChecked){
                simulationResultsDTO.trippingInResults 
                = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                frictionFactors_Casing[i],
                frictionFactors_OpenHole[i]);
                simulationResult_TrippingIns.push({...simulationResultsDTO});
            }
        }

        frictionFactors_Casing = [] as number[];
        frictionFactors_OpenHole = [] as number[];
        texts = this.simulationDTO.sensitivityParameters.trippingOut_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.trippingOut_2.split("-");
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_TrippingOuts.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_TrippingOuts.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_TrippingOuts.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_TrippingOuts.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isTrippingOutChecked){
                simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                    this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                    weakeastTensileStrenth,
                    frictionFactors_Casing[i],
                    frictionFactors_OpenHole[i]);
                    simulationResult_TrippingOuts.push({...simulationResultsDTO});
            }
        }

        frictionFactors_Casing = [] as number[];
        frictionFactors_OpenHole = [] as number[];
        texts = this.simulationDTO.sensitivityParameters.drilling_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.drilling_2.split("-");
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_Drillings.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_Drillings.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_Drillings.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_Drillings.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isRotatingOnBottomChecked){
                simulationResultsDTO.drillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                    this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                    weakeastTensileStrenth,
                    frictionFactors_Casing[i],
                    frictionFactors_OpenHole[i]);
                    simulationResult_Drillings.push({...simulationResultsDTO});
            }
        }


        frictionFactors_Casing = [] as number[];
        frictionFactors_OpenHole = [] as number[];
        texts = this.simulationDTO.sensitivityParameters.rotatingOffBottom_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.rotatingOffBottom_2.split("-");
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_RotatingOffBottoms.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_RotatingOffBottoms.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_RotatingOffBottoms.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_RotatingOffBottoms.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isRotatingOffBottomChecked){
                simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                    this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                    weakeastTensileStrenth,
                    frictionFactors_Casing[i],
                    frictionFactors_OpenHole[i]);
                    simulationResult_RotatingOffBottoms.push({...simulationResultsDTO});
            }
        }

        frictionFactors_Casing = [] as number[];
        frictionFactors_OpenHole = [] as number[];
        texts = this.simulationDTO.sensitivityParameters.slideDrilling_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.slideDrilling_2.split("-");
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_SlideDrillings.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_SlideDrillings.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_SlideDrillings.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_SlideDrillings.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isSlideDrillingChecked){
                simulationResultsDTO.slideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                    this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                    weakeastTensileStrenth,
                    frictionFactors_Casing[i],
                    frictionFactors_OpenHole[i]);
                    simulationResult_SlideDrillings.push({...simulationResultsDTO});
            }
        }

        frictionFactors_Casing = [] as number[];
        frictionFactors_OpenHole = [] as number[];
        texts = this.simulationDTO.sensitivityParameters.backReaming_1.split("-");
        texts2 = this.simulationDTO.sensitivityParameters.backReaming_2.split("-");
        if(texts.length == 1){
            frictionFactors_Casing.push(Number(texts[0]));
            frictionFactors_OpenHole.push(Number(texts2[0]));
            sensitivityResultsDTO.frictionnFactors_Backreamings.push(`CHFF = ${Number(texts[0])}, OHFF = ${Number(texts2[0])}`)
        }else {
            i = -1;
            min = Number(texts[0]);
            max = Number(texts[1]);
            mid = min +  (max - min)/2.0;
            frictionFactors_Casing.push(min);
            frictionFactors_Casing.push(mid);
            frictionFactors_Casing.push(max);

            min_op = Number(texts2[0]);
            max_op = Number(texts2[1]);
            mid_op = min_op +  (max_op - min_op)/2.0;
            frictionFactors_OpenHole.push(min_op);
            frictionFactors_OpenHole.push(mid_op);
            frictionFactors_OpenHole.push(max_op);

            sensitivityResultsDTO.frictionnFactors_Backreamings.push(`CHFF = ${min}, OHFF = ${min_op}`)
            sensitivityResultsDTO.frictionnFactors_Backreamings.push(`CHFF = ${mid}, OHFF = ${mid_op}`)
            sensitivityResultsDTO.frictionnFactors_Backreamings.push(`CHFF = ${max}, OHFF = ${max_op}`)
        }

        for (i = 0; i < frictionFactors_Casing.length; i++)
        {
            simulationResultsDTO = {} as SimulationResultsDTO;
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            if (this.allInputs.operation.isBackReamingChecked){
                simulationResultsDTO.backReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                    this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                    weakeastTensileStrenth,
                    frictionFactors_Casing[i],
                    frictionFactors_OpenHole[i]);
                    simulationResult_Backreamings.push({...simulationResultsDTO});
            }
        }

        sensitivityResultsDTO.simulationResult_TrippingIns = simulationResult_TrippingIns.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_TrippingOuts = simulationResult_TrippingOuts.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_Drillings = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_RotatingOffBottoms = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_SlideDrillings = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_Backreamings = simulationResult_Backreamings.map((row:SimulationResultsDTO) => {
            return row;
        })

        return sensitivityResultsDTO;
    },


    RunNonSensitivities():SensitivityResultsDTO {
        const doglegSeverityMethod:string = "Lubrinski", bucklingMethod:string = "Inclined";

        const DevSurveyMD:number[] = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const DevSurveyInclination:number[]= DevSurveyUtils.GetDevSurveyInclinations(this.allInputs.deviationSurveys);

        const DevSurveyAzimuth:number[] = DevSurveyUtils.GetDevSurveyAzimuths(this.allInputs.deviationSurveys);

        const DevSurveyTVD:number[] = DevSurveyUtils.GetDevSurveyTVDs(this.allInputs.deviationSurveys);

        const DevSurveyVerticalDisplacement:number[] = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const DevSurveyDogLegs:number[] = DevSurveyUtils.GetDevSurveyDogLeg(this.allInputs.deviationSurveys);

        const LastMDHole:number = this.allInputs.holeSections[this.allInputs.holeSections.length - 1].bottomOfHole;

        console.log("seen 1")

        this.allInputs.pipes = Sorting.SortListofPipeReversed(this.allInputs.pipes);
        console.log("seen 2")


        const {_pipes, _isJoints} = PipeUtils.GetPipeDecrementsNew(this.allInputs.pipes, this.allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);

                                        console.log("seen 3")
        const sortedPipeIncrements:Pipe[] = Sorting.SortListofPipeReversed(_pipes);


        if (this.allInputs.operation.torqueAtBitDrillingOperation == null)
        this.allInputs.operation.torqueAtBitDrillingOperation = 0;

        if (this.allInputs.operation.torqueAtBit == null)
        this.allInputs.operation.torqueAtBit = 0;

        if (this.allInputs.operation.torqueAtBitBackReaming == null)
        this.allInputs.operation.torqueAtBitBackReaming = 0;

        if (this.allInputs.operation.weightOnBit == null)
        this.allInputs.operation.weightOnBit = 0;

        if (this.allInputs.operation.weightOnBitIDHM == null)
        this.allInputs.operation.weightOnBitIDHM = 0;

        const { weakeastTensileStrenth, baseOperationResults } 
        = TorqueDragBaseOperation.RunBaseOperation(sortedPipeIncrements,
            this.allInputs.holeSections, doglegSeverityMethod,
            this.allInputs.mudPVTs, this.allInputs.common);

            console.log("seen 4")

        let sensitivityResultsDTO = {} as SensitivityResultsDTO;
        let simulationResult_TrippingIns:SimulationResultsDTO[] = [];
        let simulationResult_TrippingOuts:SimulationResultsDTO[] = [];
        let simulationResult_Drillings:SimulationResultsDTO[] = [];
        let simulationResult_RotatingOffBottoms:SimulationResultsDTO[] = [];
        let simulationResult_SlideDrillings:SimulationResultsDTO[] = [];
        let simulationResult_Backreamings:SimulationResultsDTO[] = [];
        let simulationResultsDTO = {} as SimulationResultsDTO;

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isTrippingInChecked){
            simulationResultsDTO.trippingInResults 
            = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
            weakeastTensileStrenth,
            null,
            null);
            simulationResult_TrippingIns.push({...simulationResultsDTO});
        }

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isTrippingOutChecked){
            simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                null,
                null);
                simulationResult_TrippingOuts.push({...simulationResultsDTO});
        }

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isRotatingOnBottomChecked){
            simulationResultsDTO.drillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                null,
                null);
                simulationResult_Drillings.push({...simulationResultsDTO});
        }

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isRotatingOffBottomChecked){
            simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                null,
                null);
                simulationResult_RotatingOffBottoms.push({...simulationResultsDTO});
        }

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isSlideDrillingChecked){
            simulationResultsDTO.slideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                null,
                null);
                simulationResult_SlideDrillings.push({...simulationResultsDTO});
        }

        simulationResultsDTO = {} as SimulationResultsDTO;
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
        if (this.allInputs.operation.isBackReamingChecked){
            simulationResultsDTO.backReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                weakeastTensileStrenth,
                null,
                null);
                simulationResult_Backreamings.push({...simulationResultsDTO});
        }

        sensitivityResultsDTO.simulationResult_TrippingIns = simulationResult_TrippingIns.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_TrippingOuts = simulationResult_TrippingOuts.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_Drillings = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_RotatingOffBottoms = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_SlideDrillings = simulationResult_Drillings.map((row:SimulationResultsDTO) => {
            return row;
        })

        sensitivityResultsDTO.simulationResult_Backreamings = simulationResult_Backreamings.map((row:SimulationResultsDTO) => {
            return row;
        })

        return sensitivityResultsDTO;
    }



}