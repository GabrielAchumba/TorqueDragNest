import { AllInputsDTO } from "src/dtos/allInputsDTO";
import { SensitivityResultsDTO } from "src/dtos/sensitivityResultsDTO";
import { SimulationDTO } from "src/dtos/simulationDTO";
import { SimulationResultsDTO } from "src/dtos/simulationResultsDTO";
import { Sorting } from "src/mathematics/sorting";
import { Pipe } from "src/models/basepipe";
import { DevSurveyUtils } from "src/schematicsanalysis/devSurveyUtils";
import { PipeUtils } from "src/schematicsanalysis/pipeUtils";
import { BackReaming } from "./backReaming";
import { RotatingOffBottom } from "./rotatingOffBottom";
import { RotatingOnBottom } from "./rotatingOnBottom";
import { SlideDrilling } from "./slideDrilling";
import { TorqueDragBaseOperation } from "./torqueDragBaseOperation";
import { TrippingIn } from "./trippingIn";
import { TrippingOut } from "./trippingOut";

export class TorqueDragSimulation {
  
    public static allInputs:AllInputsDTO;
    public static simulationDTO:SimulationDTO;


    public static Run():SensitivityResultsDTO
    {
        const doglegSeverityMethod:string = "Lubrinski", bucklingMethod:string = "Inclined";

        const DevSurveyMD:number[] = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const DevSurveyInclination:number[] = DevSurveyUtils.GetDevSurveyInclinations(this.allInputs.deviationSurveys);

        const DevSurveyAzimuth:number[] = DevSurveyUtils.GetDevSurveyAzimuths(this.allInputs.deviationSurveys);

        const DevSurveyTVD:number[] = DevSurveyUtils.GetDevSurveyTVDs(this.allInputs.deviationSurveys);

        const DevSurveyVerticalDisplacement:number[] = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const DevSurveyDogLegs:number[] = DevSurveyUtils.GetDevSurveyDogLeg(this.allInputs.deviationSurveys);

        const LastMDHole:number = this.allInputs.holeSections[this.allInputs.holeSections.length - 1].bottomOfHole;

        this.allInputs.pipes = Sorting.SortListofPipeReversed(this.allInputs.pipes);

        const {_pipes, _isJoints} = PipeUtils.GetPipeDecrementsNew(this.allInputs.pipes, this.allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);
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

        let simulationResultsDTO:SimulationResultsDTO = new SimulationResultsDTO();
        simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;


        if (this.allInputs.operation.isTrippingInChecked)
            simulationResultsDTO.trippingInResults 
            = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            weakeastTensileStrenth);

        if (this.allInputs.operation.isTrippingOutChecked)
            simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults, weakeastTensileStrenth);

        if (this.allInputs.operation.isRotatingOnBottomChecked)
            simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults, weakeastTensileStrenth);

        if (this.allInputs.operation.isRotatingOffBottomChecked)
            simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults, weakeastTensileStrenth);

        if (this.allInputs.operation.isSlideDrillingChecked)
            simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults, weakeastTensileStrenth);

        if (this.allInputs.operation.isBackReamingChecked)
            simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults, weakeastTensileStrenth);



        let sensitivityResultsDTO:SensitivityResultsDTO = new SensitivityResultsDTO();
        let simulationResultDTOs:SimulationResultsDTO[] = [];
        simulationResultDTOs.push(simulationResultsDTO);
        sensitivityResultsDTO.simulationResultsDTOs
         = simulationResultDTOs.map((row:SimulationResultsDTO) => {
            return row;
         })


        return sensitivityResultsDTO;
    }


    public static RunSensitivities():SensitivityResultsDTO
    {
        const doglegSeverityMethod:string = "Lubrinski", bucklingMethod:string = "Inclined";

        const DevSurveyMD:number[] = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const DevSurveyInclination:number[]= DevSurveyUtils.GetDevSurveyInclinations(this.allInputs.deviationSurveys);

        const DevSurveyAzimuth:number[] = DevSurveyUtils.GetDevSurveyAzimuths(this.allInputs.deviationSurveys);

        const DevSurveyTVD:number[] = DevSurveyUtils.GetDevSurveyTVDs(this.allInputs.deviationSurveys);

        const DevSurveyVerticalDisplacement:number[] = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const DevSurveyDogLegs:number[] = DevSurveyUtils.GetDevSurveyDogLeg(this.allInputs.deviationSurveys);

        const LastMDHole:number = this.allInputs.holeSections[this.allInputs.holeSections.length - 1].bottomOfHole;

        this.allInputs.pipes = Sorting.SortListofPipeReversed(this.allInputs.pipes);

        const {_pipes, _isJoints} = PipeUtils.GetPipeDecrementsNew(this.allInputs.pipes, this.allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);
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

        let sensitivityResultsDTO:SensitivityResultsDTO = new SensitivityResultsDTO();
        let simulationResultDTOs:SimulationResultsDTO[] = [];
        let simulationResultsDTO:SimulationResultsDTO = new SimulationResultsDTO();
        const noOfSensitivities:number = this.simulationDTO.noOfSensitivities;
        simulationResultDTOs = [];
        let i = 0;

        for (i = 1; i <= noOfSensitivities; i++)
        {
            simulationResultsDTO = new SimulationResultsDTO();
            simulationResultsDTO.isTrippingInChecked = this.allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = this.allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = this.allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = this.allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = this.allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = this.allInputs.operation.isRotatingOffBottomChecked;
            switch (i)
            {
                case 1:
                    if (this.allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults 
                        = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingIn_1,
                            this.simulationDTO.sensitivityParameters.trippingIn_2);

                    if (this.allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingOut_1,
                            this.simulationDTO.sensitivityParameters.trippingOut_2);

                    if (this.allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.drilling_1,
                            this.simulationDTO.sensitivityParameters.drilling_2);

                    if (this.allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_1,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_2);


                    if (this.allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.slideDrilling_1,
                            this.simulationDTO.sensitivityParameters.slideDrilling_2);

                    if (this.allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.backReaming_1,
                            this.simulationDTO.sensitivityParameters.backReaming_2);

                    simulationResultDTOs.push(simulationResultsDTO);
                    break;
                case 2:
                    if (this.allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingIn_3,
                            this.simulationDTO.sensitivityParameters.trippingIn_4);

                    if (this.allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingOut_3,
                            this.simulationDTO.sensitivityParameters.trippingOut_4);

                    if (this.allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.drilling_3,
                            this.simulationDTO.sensitivityParameters.drilling_4);

                    if (this.allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_3,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_4);

                    if (this.allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.slideDrilling_3,
                            this.simulationDTO.sensitivityParameters.slideDrilling_4);

                    if (this.allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.backReaming_3,
                            this.simulationDTO.sensitivityParameters.backReaming_4);

                    simulationResultDTOs.push(simulationResultsDTO);
                    break;
                case 3:
                    if (this.allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingIn_5,
                            this.simulationDTO.sensitivityParameters.trippingIn_6);

                    if (this.allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingOut_5,
                            this.simulationDTO.sensitivityParameters.trippingOut_6);

                    if (this.allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.drilling_5,
                            this.simulationDTO.sensitivityParameters.drilling_6);

                    if (this.allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_5,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_6);

                    if (this.allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.slideDrilling_5,
                            this.simulationDTO.sensitivityParameters.slideDrilling_6);

                    if (this.allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.backReaming_5,
                            this.simulationDTO.sensitivityParameters.backReaming_6);

                    simulationResultDTOs.push(simulationResultsDTO);
                    break;
                case 4:
                    if (this.allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingIn_7,
                            this.simulationDTO.sensitivityParameters.trippingIn_8);

                    if (this.allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingOut_7,
                            this.simulationDTO.sensitivityParameters.trippingOut_8);

                    if (this.allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.drilling_7,
                            this.simulationDTO.sensitivityParameters.drilling_8);

                    if (this.allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_7,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_8);

                    if (this.allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.slideDrilling_7,
                            this.simulationDTO.sensitivityParameters.slideDrilling_8);

                    if (this.allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.backReaming_7,
                            this.simulationDTO.sensitivityParameters.backReaming_8);

                    simulationResultDTOs.push(simulationResultsDTO);
                    break;
                case 5:
                    if (this.allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = TrippingIn.RunTrippingInOpertion(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingIn_9,
                            this.simulationDTO.sensitivityParameters.trippingIn_10);

                    if (this.allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = TrippingOut.RunTrippingOutOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.trippingOut_9,
                            this.simulationDTO.sensitivityParameters.trippingOut_10);

                    if (this.allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RotatingOnBottom.RunRotatingOnBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.drilling_9,
                            this.simulationDTO.sensitivityParameters.drilling_10);

                    if (this.allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RotatingOffBottom.RunRotatingOffBottomOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_9,
                            this.simulationDTO.sensitivityParameters.rotatingOffBottom_10);

                    if (this.allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = SlideDrilling.RunSlideDrillingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.slideDrilling_9,
                            this.simulationDTO.sensitivityParameters.slideDrilling_10);

                    if (this.allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = BackReaming.RunBackReamingOperation(sortedPipeIncrements, this.allInputs.operation,
                            this.allInputs.mudPVTs, this.allInputs.common, baseOperationResults,
                            this.simulationDTO.sensitivityParameters.backReaming_9,
                            this.simulationDTO.sensitivityParameters.backReaming_10);

                    simulationResultDTOs.push(simulationResultsDTO);
                    break;
            }

        }

        sensitivityResultsDTO.simulationResultsDTOs = simulationResultDTOs.map((row:SimulationResultsDTO) => {
            return row;
        })
        return sensitivityResultsDTO;
    }



}