import { type } from "os";
import { AllInputsDTO } from "src/dtos/allInputsDTO";
import { RigDTO } from "src/dtos/rigDTO";
import { SensitivityResultsDTO } from "src/dtos/sensitivityResultsDTO";
import { SimulationResultsDTO } from "src/dtos/simulationResultsDTO";
import { BinghamReNumber } from "src/hydraulics/binghamReNumber";
import { BinghamVelocity } from "src/hydraulics/binghamVelocity";
import { BinghamViscosity } from "src/hydraulics/binghamViscosity";
import { newtonianFrictionFactor } from "src/hydraulics/newtonianFrictionFactor";
import { NewtonianReNumber } from "src/hydraulics/newtonianReNumber";
import { Optimization } from "src/hydraulics/optimization";
import { PressureLoss } from "src/hydraulics/pressureLoss";
import { Interpolation } from "src/mathematics/interpolation";
import { NonLinearEquations } from "src/mathematics/nonLinearEquations";
import { Regression } from "src/mathematics/regression";
import { Sorting } from "src/mathematics/sorting";
import { Spacing } from "src/mathematics/spacing";
import { BaseHoleSectionModel } from "src/models/baseholesection";
import { Pipe } from "src/models/basepipe";
import { Common } from "src/models/common";
import { DeviationSurveyModel } from "src/models/deviationSurvey";
import { DrillBit } from "src/models/drillbit";
import { RheologyModel } from "src/models/enums";
import { Fluid } from "src/models/fluid";
import { MudPVTModel } from "src/models/mudpvt";
import { Operation } from "src/models/operation";
import { BaseOperationResult, OperationResult } from "src/models/operationResult";
import { DevSurveyUtils } from "src/schematicsanalysis/devSurveyUtils";
import { HoleUtils } from "src/schematicsanalysis/holeUtils";
import { PipeUtils } from "src/schematicsanalysis/pipeUtils";
import { DrillingStrings } from "src/torquedrag/drillingengineering/drillingStrings";
import { FrictionalPressureBingham } from "./nonuniformpipes/frictionalPressureBingham";
import { FrictionalPressureNewton } from "./nonuniformpipes/frictionalPressureNewton";
import { Rate } from "./nonuniformpipes/rate";

export class SurgeSwabSimulation {

    static allInputs:AllInputsDTO;

    static RunHydraulics():SensitivityResultsDTO
    {


        const DevSurveyMD:number[] 
        = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const DevSurveyInclination:number[]  
        = DevSurveyUtils.GetDevSurveyInclinations(this.allInputs.deviationSurveys);

        const DevSurveyAzimuth:number[]  
        = DevSurveyUtils.GetDevSurveyAzimuths(this.allInputs.deviationSurveys);

        const DevSurveyTVD:number[]  
        = DevSurveyUtils.GetDevSurveyTVDs(this.allInputs.deviationSurveys);

        const DevSurveyVerticalDisplacement:number[]  
        = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const DevSurveyDogLegs:number[]  
        = DevSurveyUtils.GetDevSurveyDogLeg(this.allInputs.deviationSurveys);

        const LastMDHole:number = 
        this.allInputs.holeSections[this.allInputs.holeSections.length - 1].bottomOfHole;

        this.allInputs.pipes = Sorting.SortListofPipeReversed(this.allInputs.pipes);

        const {_pipes, _isJoints} = PipeUtils.GetPipeDecrements(this.allInputs.pipes, this.allInputs.common,
             DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
            DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);

          

        const sortedPipeIncrements:Pipe[] = Sorting.SortListofPipeReversed(_pipes);

        const sensitivityResultsDTO:SensitivityResultsDTO = new SensitivityResultsDTO();
        let simulationResultDTOs:SimulationResultsDTO[] = [];
        

        let rigDTO:RigDTO = new RigDTO();
        rigDTO.maxHorsePower = this.allInputs.rig.maxHorsePower;
        const mudDensity:number = this.allInputs.mudPVTs[0].density / 7.481; //lb/ft3
        rigDTO.mudDensity = mudDensity;
        const nozzleArea:number = PressureLoss.NozzleFlowArea(this.allInputs.drillBit.bitSize, 
            this.allInputs.drillBit.numberOfBitNozzles);
        const lowPressureDropThroughBit:number = PressureLoss.AcrossBit(this.allInputs.rig.flowRateLowPumpPressure,
            mudDensity, this.allInputs.drillBit.dischargeCoefficient, nozzleArea);
        const highPressureDropThroughBit:number = PressureLoss.AcrossBit(this.allInputs.rig.flowRateHighPumpPressure,
            mudDensity, this.allInputs.drillBit.dischargeCoefficient, nozzleArea);
        rigDTO.lowParasiticPressureLoss = this.allInputs.rig.lowPumpPressure - lowPressureDropThroughBit;
        rigDTO.highParasiticPressureLoss = this.allInputs.rig.highPumpPressure - highPressureDropThroughBit;
        const deltaX:number = Math.log(this.allInputs.rig.flowRateHighPumpPressure /
             this.allInputs.rig.flowRateLowPumpPressure);
        const deltaY:number = Math.log(rigDTO.highParasiticPressureLoss / rigDTO.lowParasiticPressureLoss);
        const testFlowRates:number[] = [Math.log(this.allInputs.rig.flowRateLowPumpPressure), 
            Math.log(this.allInputs.rig.flowRateHighPumpPressure)];
        const testPressues:number[] = [Math.log(rigDTO.lowParasiticPressureLoss,),
            Math.log(rigDTO.highParasiticPressureLoss)]

        let { slope, intercept } = Regression.LinearRegression(testFlowRates, testPressues);
        intercept = Math.exp(intercept);
        const flowExponent:number = slope;
        rigDTO.flowExponent = flowExponent;
        rigDTO.maximumPumpRate = PressureLoss.flowRateFromHorsePower(this.allInputs.rig.pumpEfficiency,
            this.allInputs.rig.maxHorsePower,
            this.allInputs.rig.maxAllowableSurfacePressure);

        let i:number = 0;
        let n:number = 3;

        const minRate2:number = this.allInputs.rig.flowRateLowPumpPressure;
        const minPressure2:number = rigDTO.lowParasiticPressureLoss;
        const minRate:number = this.allInputs.rig.flowRateLowPumpPressure;
        const minPressure:number = rigDTO.lowParasiticPressureLoss;

        const Funx = (rate:number):number =>
        {
            const residual:number = SurgeSwabSimulation.minimizePbPb(rate, sortedPipeIncrements);
            return residual;
        };

        const fa0:number = rigDTO.maximumPumpRate / 2;
        const fa:number = NonLinearEquations.NewtonRaphson(Funx, fa0);

        const maxRate:number = Math.pow(((this.allInputs.rig.maxAllowableSurfacePressure - 5) / intercept), (1 / slope));// rigDTO.maximumPumpRate;// + 600;
        rigDTO.pumpFlowRate = Spacing.LineSpace(50, fa * 1.2, 20);// Spacing.GeometricalSpace(0.5, fa*1.5, 20);// Spacing.LineSpace(0.5, rigDTO.maximumPumpRate, 20);




        n = rigDTO.pumpFlowRate.length;
        for(i = 0; i < n; i++)
        {
            
            rigDTO.pumpPressures.push(intercept* Math.pow(rigDTO.pumpFlowRate[i],slope));
            rigDTO.lowPressures.push(rigDTO.lowParasiticPressureLoss);
            rigDTO.highPressures.push(rigDTO.highParasiticPressureLoss);
            rigDTO.optimumPressures.push(rigDTO.minimumPumpPressure);
        }

        
        rigDTO.maximumPumpPressureD = Interpolation.LinearInterpolation(rigDTO.pumpFlowRate, rigDTO.pumpPressures, rigDTO.maximumPumpRate);
        rigDTO.maximumPumpPressureB = this.allInputs.rig.maxAllowableSurfacePressure - rigDTO.maximumPumpPressureD;
        rigDTO.optimunTotalNozzleArea = PressureLoss.NozzleFlowArea2(rigDTO.maximumPumpRate,
            mudDensity, this.allInputs.drillBit.dischargeCoefficient, rigDTO.maximumPumpPressureB);

        
        for(i = 0; i < n; i++)
        {
            const simulationResultsDTO:SimulationResultsDTO = new SimulationResultsDTO();
            simulationResultsDTO.hydraulicsResults = [];
            const { baseOperationResultsUpdated } = SurgeSwabSimulation.RunHydraulics2(sortedPipeIncrements, this.allInputs.holeSections,
                                                                this.allInputs.mudPVTs, this.allInputs.common,
                                                                this.allInputs.fluid,
                                                                this.allInputs.operation, this.allInputs.drillBit, rigDTO.pumpFlowRate[i] * 0.133681/60,
                                                                this.allInputs.rig.maxAllowableSurfacePressure,
                                                                this.allInputs.rig.pumpEfficiency,
                                                                this.allInputs.drillBit.dischargeCoefficient, rigDTO.pumpFlowRate[i],
                                                                this.allInputs.rig.maxHorsePower);

            simulationResultsDTO.hydraulicsResults = baseOperationResultsUpdated;
            simulationResultDTOs.push(simulationResultsDTO);
        }
        
        sensitivityResultsDTO.simulationResultsDTOs = simulationResultDTOs.map((row:SimulationResultsDTO) => {
            return row;
        })
        

        sensitivityResultsDTO.rigDTO = rigDTO;

        return sensitivityResultsDTO;

    }

   /*  public static SensitivityResultsDTO RunSurgeSwab()
    {


        List<double> DevSurveyMD = DevSurveyUtils.GetDevSurveyMDs(allInputs.deviationSurveys);

        List<double> DevSurveyInclination = DevSurveyUtils.GetDevSurveyInclinations(allInputs.deviationSurveys);

        List<double> DevSurveyAzimuth = DevSurveyUtils.GetDevSurveyAzimuths(allInputs.deviationSurveys);

        List<double> DevSurveyTVD = DevSurveyUtils.GetDevSurveyTVDs(allInputs.deviationSurveys);

        List<double> DevSurveyVerticalDisplacement = DevSurveyUtils.GetDevSurveyVerticalSections(allInputs.deviationSurveys);

        List<double> DevSurveyDogLegs = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        double LastMDHole = allInputs.holeSections[allInputs.holeSections.Count - 1].bottomOfHole;

        allInputs.pipes = Sorting.SortListofPipeReversed(allInputs.pipes);

        var pipesTuple = PipeUtils.GetPipeDecrements(allInputs.pipes, allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);
        List<Pipe> sortedPipeIncrements = Sorting.SortListofPipeReversed(pipesTuple.Item1);
        List<bool> _isJoints = pipesTuple.Item2;

        SensitivityResultsDTO sensitivityResultsDTO = new SensitivityResultsDTO();
        List<SimulationResultsDTO> simulationResultDTOs = new List<SimulationResultsDTO>();

        RigDTO rigDTO = new RigDTO();
        double mudDensity = allInputs.mudPVTs[0].density / 7.481; //lb/ft3
        rigDTO.mudDensity = mudDensity;
        double nozzleArea = PressureLoss.NozzleFlowArea(allInputs.drillBit.bitSize, allInputs.drillBit.numberOfBitNozzles);
        double lowPressureDropThroughBit = PressureLoss.AcrossBit(allInputs.rig.flowRateLowPumpPressure,
            mudDensity, allInputs.drillBit.dischargeCoefficient, nozzleArea);
        double highPressureDropThroughBit = PressureLoss.AcrossBit(allInputs.rig.flowRateHighPumpPressure,
            mudDensity, allInputs.drillBit.dischargeCoefficient, nozzleArea);
        rigDTO.lowParasiticPressureLoss = allInputs.rig.lowPumpPressure - lowPressureDropThroughBit;
        rigDTO.highParasiticPressureLoss = allInputs.rig.highPumpPressure - highPressureDropThroughBit;
        double deltaX = Math.Log(allInputs.rig.flowRateHighPumpPressure / allInputs.rig.flowRateLowPumpPressure, Math.E);
        double deltaY = Math.Log(rigDTO.highParasiticPressureLoss / rigDTO.lowParasiticPressureLoss, Math.E);
        List<double> testFlowRates = new List<double>() {Math.Log(allInputs.rig.flowRateLowPumpPressure, Math.E),
            Math.Log(allInputs.rig.flowRateHighPumpPressure, Math.E) };
        List<double> testPressues = new List<double>() { Math.Log(rigDTO.lowParasiticPressureLoss, Math.E),
            Math.Log(rigDTO.highParasiticPressureLoss, Math.E) };
        var results = Regression.LinearRegression(testFlowRates, testPressues);
        double slope = results.Item1, intercept = Math.Exp(results.Item2);
        double flowExponent = slope;//  deltaY / deltaX;
        rigDTO.flowExponent = flowExponent;
        rigDTO.maximumPumpRate = PressureLoss.flowRateFromHorsePower(allInputs.rig.pumpEfficiency, allInputs.rig.maxHorsePower,
            allInputs.rig.maxAllowableSurfacePressure);
        int i = 0;
        double n = 3;
        double minRate2 = allInputs.rig.flowRateLowPumpPressure;
        double minPressure2 = rigDTO.lowParasiticPressureLoss;
        double minRate = allInputs.rig.flowRateLowPumpPressure;
        double minPressure = rigDTO.lowParasiticPressureLoss;

        Func<double, double> Funx = new Func<double, double>(rate =>
        {
            //rigDTO.pumpFlowRate.Add(rate);
            double residual = minimizePbPb(rate, sortedPipeIncrements);
            return residual;
        });

        double fa0 = rigDTO.maximumPumpRate/2;
        double fa = NonLinearEquations.NewtonRaphson(Funx, fa0);

        double maxRate = Math.Pow(((allInputs.rig.maxAllowableSurfacePressure - 5) / intercept), (1 / slope));// rigDTO.maximumPumpRate;// + 600;
        rigDTO.pumpFlowRate = Spacing.LineSpace(50, fa * 1.2, 20);// Spacing.GeometricalSpace(0.5, fa*1.5, 20);// Spacing.LineSpace(0.5, rigDTO.maximumPumpRate, 20);


        n = rigDTO.pumpFlowRate.Count;
        for (i = 0; i < n; i++)
        {
            double P = intercept * Math.Pow(rigDTO.pumpFlowRate[i], slope);
            rigDTO.pumpPressures.Add(P);
            rigDTO.lowPressures.Add(rigDTO.lowParasiticPressureLoss);
            rigDTO.highPressures.Add(rigDTO.highParasiticPressureLoss);
            rigDTO.optimumPressures.Add(rigDTO.minimumPumpPressure);
        }



        n = rigDTO.pumpPressures.Count;
        maxRate = rigDTO.pumpFlowRate[(int)n - 1];
        rigDTO.minimumPumpRate = allInputs.rig.minimumFlowRate;
        rigDTO.maximumPumpPressureD = Interpolation.LinearInterpolation(rigDTO.pumpFlowRate, rigDTO.pumpPressures, maxRate);
        rigDTO.maximumPumpPressureB = allInputs.rig.maxAllowableSurfacePressure - rigDTO.maximumPumpPressureD;
        double maximumPumpPressureD = allInputs.rig.maxHorsePower / (flowExponent + 1);
        double maximumPumpPressureB = allInputs.rig.maxAllowableSurfacePressure - maximumPumpPressureD;
        double optimumFlowRate = Interpolation.LinearInterpolation(rigDTO.pumpPressures, rigDTO.pumpFlowRate, maximumPumpPressureD);
        rigDTO.optimunTotalNozzleArea = PressureLoss.NozzleFlowArea(optimumFlowRate,
        mudDensity, allInputs.drillBit.dischargeCoefficient, maximumPumpPressureB);

        for (i = 0; i < n; i++)
        {
            SimulationResultsDTO simulationResultsDTO = new SimulationResultsDTO();
            //List<BaseOperationResult> baseOperationResults = new List<BaseOperationResult>();
            //Func<double, double> Fun = new Func<double, double>(x =>
            //{
            //    var ans = RunSurgeSwab(sortedPipeIncrements,
            //                                                       allInputs.holeSections,
            //                                                       allInputs.mudPVTs, allInputs.common,
            //                                                       allInputs.fluid, allInputs.fluidPlotModel,
            //                                                       allInputs.operation, allInputs.drillBit, x,
            //                                                       rigDTO.pumpFlowRate[i] * 0.133681 / 60,
            //                                                       allInputs.rig.maxAllowableSurfacePressure,
            //                                                    allInputs.rig.pumpEfficiency,
            //                                                    allInputs.drillBit.dischargeCoefficient, rigDTO.pumpFlowRate[i],
            //                                                   allInputs.rig.maxHorsePower);
            //    simulationResultsDTO.surgeSwabResults = ans.Item2;
            //    return ans.Item1;
            //});


            //fa0 = 0.5;
            //fa = NonLinearEquations.NewtonRaphson(Fun, fa0);

            var ans = RunSurgeSwab(sortedPipeIncrements,
                                                                    allInputs.holeSections,
                                                                    allInputs.mudPVTs, allInputs.common,
                                                                    allInputs.fluid, allInputs.fluidPlotModel,
                                                                    allInputs.operation, allInputs.drillBit, 0,
                                                                    rigDTO.pumpFlowRate[i] * 0.133681 / 60,
                                                                    allInputs.rig.maxAllowableSurfacePressure,
                                                                allInputs.rig.pumpEfficiency,
                                                                allInputs.drillBit.dischargeCoefficient, rigDTO.pumpFlowRate[i],
                                                                allInputs.rig.maxHorsePower);
            simulationResultsDTO.surgeSwabResults = ans.Item2;
            simulationResultDTOs.Add(simulationResultsDTO);
        }


        
        sensitivityResultsDTO.simulationResultsDTOs = new List<SimulationResultsDTO>(simulationResultDTOs);
        sensitivityResultsDTO.rigDTO = rigDTO;


        return sensitivityResultsDTO;

    } */

    private static  RunBaseOperation(pipes:Pipe[], holeSections:BaseHoleSectionModel[],
        mudPVTs:MudPVTModel[],  common:Common,
        fluid:Fluid,
        operation:Operation, drillBit:DrillBit, fa:number,
        mudPumpRate:number,
        maxAllowableSurfacePressure:number, pumpEfficiency:number,
        dischargeCoefficient:number, mudPumpRatePGM:number,
        maxHorsePower:number): any
{

let selectedRheologyModel:RheologyModel = RheologyModel.Newtonian;
switch (fluid.rheologyModel)
{
    case "Newtonian":
    selectedRheologyModel = RheologyModel.Newtonian;
    break;

    case "Bingham Plastic":
    selectedRheologyModel = RheologyModel.Bingham_Plastic;
    break;

    case "Power law":
    selectedRheologyModel = RheologyModel.Power_Law;
    break;

    case "Herschel Bulkley":
    selectedRheologyModel = RheologyModel.Herschel_Bulkley;
    break;
}

let baseOperationResults:BaseOperationResult[] = [];
const mudDensity:number = mudPVTs[0].density / 7.48; //lb/ft3
const plasticViscosity:number = mudPVTs[0].plasticViscoity;
const yieldPoint:number = mudPVTs[0].yieldPoint;;
let ii:number = -1;
const NumberOfBitNozzles:number = drillBit.numberOfBitNozzles;
const Vp:number = operation.trippingInSpeed / 60.0;
const bitSize:number = drillBit.bitSize;
const BitArea:number = Optimization.bitArea(bitSize, NumberOfBitNozzles);
const lastPipeOD:number = pipes[0].outerDiameter;
const totalFlowRate:number = mudPumpRate;
const LastDepthResult:BaseOperationResult = new BaseOperationResult();
const pipesLength:number = pipes.length;

for (ii = 0; ii < pipesLength;  ii++)
{
    const pipe:Pipe = pipes[ii];
    const baseOperationResult:OperationResult = new OperationResult();
    baseOperationResult.length = pipe.length;
    baseOperationResult.typeOfSection = pipe.typeOfSection;
    baseOperationResult.pipeOuterDiameter = pipe.outerDiameter;
    baseOperationResult.pipeInnerDiameter = pipe.innerDiameter;
    baseOperationResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
    baseOperationResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
    baseOperationResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
    baseOperationResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
    baseOperationResult.mudDensityAnnulus = mudDensity;
    baseOperationResult.mudDensityInsidePipe = mudDensity;
    baseOperationResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
    baseOperationResult.bottomMeasuredDepth = pipe.measuredDepth;
    baseOperationResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
    baseOperationResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
    baseOperationResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
    baseOperationResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;

    if (ii == 0)
    {
    LastDepthResult.length = pipe.length;
    LastDepthResult.typeOfSection = pipe.typeOfSection;
    LastDepthResult.pipeOuterDiameter = pipe.outerDiameter;
    LastDepthResult.pipeInnerDiameter = pipe.innerDiameter;
    LastDepthResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
    LastDepthResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
    LastDepthResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
    LastDepthResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
    LastDepthResult.mudDensityAnnulus = mudDensity;
    LastDepthResult.mudDensityInsidePipe = mudDensity;
    LastDepthResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
    LastDepthResult.bottomMeasuredDepth = pipe.measuredDepth;
    LastDepthResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
    LastDepthResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
    LastDepthResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
    LastDepthResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;
    }

    if (ii == 0)
    {
    LastDepthResult.InsidePipeFlowRate = totalFlowRate;// (1 - fa) * totalFlowRate;
    LastDepthResult.pipeFluidVelocity = Rate.VelocityInsidePipe(LastDepthResult.InsidePipeFlowRate, BitArea);
    baseOperationResult.nozzleVelocity = LastDepthResult.pipeFluidVelocity;
    //LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);


    baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                    BitArea, LastDepthResult.InsidePipeFlowRate);
    baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
    baseOperationResult.pipeInnerArea);

    baseOperationResult.OutsidePipeFlowRate = totalFlowRate; // fa * totalFlowRate;
    baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
    baseOperationResult.annularArea);


    }
    else
    {
    baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                    baseOperationResults[ii - 1].pipeInnerArea,
                    baseOperationResults[ii - 1].InsidePipeFlowRate);
    baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
    baseOperationResult.pipeInnerArea);
    baseOperationResult.OutsidePipeFlowRate = Rate.flowRateOutsidePipeOpenEnded(Vp, baseOperationResult.pipeOuterArea,
                    baseOperationResults[ii - 1].pipeOuterArea,
                    baseOperationResults[ii - 1].OutsidePipeFlowRate);
    baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
    baseOperationResult.annularArea);

    }


    switch (selectedRheologyModel)
    {
    case RheologyModel.Newtonian:
    baseOperationResult.fluidViscosity = plasticViscosity;// NewtonianViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM);
    baseOperationResult.pipeReynoldsNumber = NewtonianReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
    baseOperationResult.fluidViscosity, baseOperationResult.pipeInnerDiameter);
    baseOperationResult.annulusReynoldsNumber = NewtonianReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
    baseOperationResult.fluidViscosity,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

    baseOperationResult.pipeCrticalFluidVelocity = 0;// BinghamVelocity.pipeCrticalFluidVelocity();
    baseOperationResult.pipeCriticalFlowRate = 0;// BinghamVelocity.pipeCriticalFlowRate();
    baseOperationResult.annularCrticalFluidVelocity = 0;// BinghamVelocity.annularCrticalFluidVelocity();
    baseOperationResult.annularCriticalFlowRate = 0;// BinghamVelocity.annularCriticalFlowRate();

    if (baseOperationResult.pipeReynoldsNumber < 2000)
    {
    baseOperationResult.pipeFlowRegime = "Laminar";
    baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
    baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
    baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
    baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
    baseOperationResult.length);
    }
    else
    {
    baseOperationResult.pipeFlowRegime = "Turbulent";
    baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
    baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
    baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
    baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
    mudDensity, baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
    baseOperationResult.length);
    }

    if (baseOperationResult.annulusReynoldsNumber < 2000)
    {
    baseOperationResult.annularFlowRegime = "Laminar";
    baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
            baseOperationResult.pipeOuterDiameter);
    baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
    baseOperationResult.clingingConstant);

    baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.pipeReynoldsNumber);
    baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
    baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
    }
    else
    {
    baseOperationResult.annularFlowRegime = "Turbulent";
    baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
            baseOperationResult.pipeOuterDiameter);
    baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
    baseOperationResult.clingingConstant);

    baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
    baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
    baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureTurbulentInsideAnnulus(baseOperationResult.pipeFrictionFactor,
    mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
    }

    break;
    case RheologyModel.Bingham_Plastic:
    baseOperationResult.fluidViscosity = plasticViscosity;// BinghamViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM,
                    //fluid.fannDialReading, fluid.fannRPM);
    baseOperationResult.yeildPoint = yieldPoint;// BinghamViscosity.YeildPoint(fluid.fannDialReading, fluid.fannRPM,
        //baseOperationResult.fluidViscosity);
    baseOperationResult.effectivePipeFluidViscosity = BinghamViscosity.pipeEffectiveViscosity(baseOperationResult.fluidViscosity,
    baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint, baseOperationResult.pipeFluidVelocity);

    baseOperationResult.pipeReynoldsNumber = BinghamReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
    baseOperationResult.effectivePipeFluidViscosity, baseOperationResult.pipeInnerDiameter);

    baseOperationResult.effectiveAnnulusFluidViscosity = BinghamViscosity.annularEffectiveViscosity(baseOperationResult.fluidViscosity,
    baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter,
    baseOperationResult.yeildPoint, baseOperationResult.annulusFluidVelocity);

    baseOperationResult.annulusReynoldsNumber = BinghamReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
    baseOperationResult.effectiveAnnulusFluidViscosity,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

    if (ii == 0)
    {
    LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);
    LastDepthResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.annulusFluidVelocity);

    LastDepthResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarDrillBit(mudDensity, LastDepthResult.pipeEffectiveFluidVelocity);
    LastDepthResult.annulusPressureLoss = 0;
    LastDepthResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
    baseOperationResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
    }

    baseOperationResult.pipeCrticalFluidVelocity = BinghamVelocity.pipeCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
    baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint);
    baseOperationResult.pipeCriticalFlowRate = BinghamVelocity.pipeCriticalFlowRate(baseOperationResult.pipeInnerDiameter,
    baseOperationResult.pipeCrticalFluidVelocity);
    baseOperationResult.annularCrticalFluidVelocity = BinghamVelocity.annularCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
    baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.yeildPoint);
    baseOperationResult.annularCriticalFlowRate = BinghamVelocity.annularCriticalFlowRate(baseOperationResult.pipeOuterDiameter,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.annularCrticalFluidVelocity);

    if (baseOperationResult.pipeReynoldsNumber < 2000)
    {
    baseOperationResult.pipeFlowRegime = "Laminar";
    baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
    baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
    baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
    baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter, baseOperationResult.length,
    baseOperationResult.yeildPoint);
    }
    else
    {
    baseOperationResult.pipeFlowRegime = "Turbulent";
    baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
    baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
    baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
    baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
    mudDensity, baseOperationResult.pipeEffectiveFluidVelocity,
    baseOperationResult.pipeInnerDiameter, baseOperationResult.length);
    }

    if (baseOperationResult.annulusReynoldsNumber < 2000)
    {
    baseOperationResult.annularFlowRegime = "Laminar";
    baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
            baseOperationResult.pipeOuterDiameter);
    baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
    baseOperationResult.clingingConstant);
    baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.annulusReynoldsNumber);
    baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
    baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.length,
    baseOperationResult.yeildPoint);
    }
    else
    {
    baseOperationResult.annularFlowRegime = "Turbulent";
    baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
            baseOperationResult.pipeOuterDiameter);
    baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
    baseOperationResult.clingingConstant);
    baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.annulusReynoldsNumber,
    baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
    baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureTurbulentInsideAnnulus(baseOperationResult.annulusFrictionFactor,
    mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
    baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
    }

    break;
    default:
    break;
    }




    //baseOperationResult.FormatResult();
    baseOperationResults.push(baseOperationResult);
}

    let nCount:number = baseOperationResults.length;
    let sumPipePressureLoss:number = 0;
    let sumAnnulusPressureLoss:number = 0;
    let baseOperationResultsUpdated:BaseOperationResult[] = [];
    baseOperationResultsUpdated.push(LastDepthResult);
    for (ii = 0; ii < nCount; ii++)
    {
        baseOperationResultsUpdated.push(baseOperationResults[ii]);
    }
    ii = 0;
    nCount = baseOperationResultsUpdated.length;
    let equivalentCirculatingDensity:number = 0;
    let pipeHydrostatic:number = 0;
    let annularHydrostatic:number = 0;
    for (ii = nCount - 1; ii >= 0; ii--)
    {
    sumPipePressureLoss = sumPipePressureLoss + baseOperationResultsUpdated[ii].pipePressureLoss;
    sumAnnulusPressureLoss = sumAnnulusPressureLoss + baseOperationResultsUpdated[ii].annulusPressureLoss;
    baseOperationResultsUpdated[ii].totalPipePressureLoss = sumPipePressureLoss;
    baseOperationResultsUpdated[ii].totalAnnulusPressureLoss = sumAnnulusPressureLoss;
    equivalentCirculatingDensity = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
    / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth);
    baseOperationResultsUpdated[ii].equivalentCirculatingDensity = mudDensity + equivalentCirculatingDensity;
    baseOperationResultsUpdated[ii].tripPerStand = baseOperationResultsUpdated[ii].bottomMeasuredDepth / Vp;

    pipeHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityInsidePipe * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;
    annularHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityAnnulus * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;

    baseOperationResultsUpdated[ii].surgePipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
    + pipeHydrostatic;
    baseOperationResultsUpdated[ii].swabPipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
    - pipeHydrostatic;

    baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
    + annularHydrostatic;
    baseOperationResultsUpdated[ii].swabAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
    - annularHydrostatic;

    baseOperationResultsUpdated[ii].eCDPipeSurge = mudDensity + (baseOperationResultsUpdated[ii].surgePipePressureLoss
    / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
    baseOperationResultsUpdated[ii].eCDAnnulusSurge = mudDensity + (baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss
    / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

    baseOperationResultsUpdated[ii].eCDPipeSwab = mudDensity + (baseOperationResultsUpdated[ii].swabPipePressureLoss
    / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
    baseOperationResultsUpdated[ii].eCDAnnulusSwab = mudDensity + (baseOperationResultsUpdated[ii].swabAnnulusPressureLoss
    / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

    //baseOperationResultsUpdated[ii].bitPressureLoss = 0;
    baseOperationResultsUpdated[ii].nozzleFlowArea = 0;
    baseOperationResultsUpdated[ii].bitHydraulicPower = 0;
    baseOperationResultsUpdated[ii].bitPowerOverArea = 0;
    baseOperationResultsUpdated[ii].nozzleVelocity = 0;
    }

    baseOperationResultsUpdated[0].parasticPressureLoss = baseOperationResultsUpdated[0].totalPipePressureLoss
    + baseOperationResultsUpdated[0].totalAnnulusPressureLoss + baseOperationResultsUpdated[0].surfacePressureLoss;
    baseOperationResultsUpdated[0].systemPressureLoss = baseOperationResultsUpdated[0].parasticPressureLoss
    + baseOperationResultsUpdated[0].bitPressureLoss;
    baseOperationResultsUpdated[0].bitPressureLoss = maxAllowableSurfacePressure - baseOperationResultsUpdated[0].parasticPressureLoss;
    if (baseOperationResultsUpdated[0].bitPressureLoss < 0) baseOperationResultsUpdated[0].bitPressureLoss = 0;

    baseOperationResultsUpdated[0].nozzleFlowArea = PressureLoss.NozzleFlowArea2(mudPumpRatePGM,
        mudDensity, this.allInputs.drillBit.dischargeCoefficient, baseOperationResultsUpdated[0].bitPressureLoss);
    baseOperationResultsUpdated[0].bitHydraulicPower = PressureLoss.BitHydraulicPower(mudPumpRatePGM, baseOperationResultsUpdated[0].bitPressureLoss,
    this.allInputs.rig.pumpEfficiency);
    baseOperationResultsUpdated[0].percentagebitHydraulicPower = (baseOperationResultsUpdated[0].bitHydraulicPower / maxHorsePower) * 100;
    //maxHorsePower * (baseOperationResults[0].bitPressureLoss / maxAllowableSurfacePressure);
    baseOperationResultsUpdated[0].bitPowerOverArea = baseOperationResultsUpdated[0].bitHydraulicPower / baseOperationResultsUpdated[0].nozzleFlowArea;
    baseOperationResultsUpdated[0].nozzleVelocity = PressureLoss.NozzleVelocity(mudPumpRatePGM, baseOperationResultsUpdated[0].nozzleFlowArea);
    baseOperationResultsUpdated[0].bitImpactForce = PressureLoss.HydraulicBitImpactForce3(mudDensity,
    baseOperationResultsUpdated[0].bitPressureLoss, mudPumpRatePGM);

    for (ii = nCount - 1; ii >= 0; ii--)
    {
    baseOperationResultsUpdated[ii].bitPressureLoss = baseOperationResultsUpdated[0].bitPressureLoss;
    baseOperationResultsUpdated[ii].systemPressureLoss = baseOperationResultsUpdated[0].systemPressureLoss;
    baseOperationResultsUpdated[ii].maximumPumpPressure = this.allInputs.rig.maxAllowableSurfacePressure;

    //var props = baseOperationResultsUpdated[ii].GetType().GetProperties();
    //bool check = false;
    //foreach (var prop in props)
    //{
    //    if (prop.GetValue(baseOperationResultsUpdated[ii]) is double)
    //    {
    //        double aa = Convert.ToDouble(prop.GetValue(baseOperationResultsUpdated[ii]));
    //        if (double.IsNaN(aa) || double.IsInfinity(aa))
    //        {
    //            check = true;
    //        }

    //    }
    //}
    }




    const residual:number = Math.abs(sumAnnulusPressureLoss - sumPipePressureLoss);

    return { residual, baseOperationResultsUpdated };
}

    private static minimizePbPb(rate:number, sortedPipeIncrements:Pipe[]):number
    {
            const simulationResultsDTO:SimulationResultsDTO = new SimulationResultsDTO();
            const fa0:number = 0;

        const { baseOperationResultsUpdated } = SurgeSwabSimulation.RunBaseOperation(sortedPipeIncrements,
                this.allInputs.holeSections,
                this.allInputs.mudPVTs, this.allInputs.common,
                this.allInputs.fluid,
                this.allInputs.operation, this.allInputs.drillBit, fa0,
                rate * 0.133681 / 60,
                this.allInputs.rig.maxAllowableSurfacePressure,
                this.allInputs.rig.pumpEfficiency,
                this.allInputs.drillBit.dischargeCoefficient, rate,
                this.allInputs.rig.maxHorsePower);

        simulationResultsDTO.surgeSwabResults = baseOperationResultsUpdated;


        const residual:number = simulationResultsDTO.surgeSwabResults[0].parasticPressureLoss 
        - simulationResultsDTO.surgeSwabResults[0].bitPressureLoss;

        return residual;

    }

    private static RunHydraulics2(pipes:Pipe[], holeSections:BaseHoleSectionModel[],
                                mudPVTs:MudPVTModel[], common:Common,
                                fluid:Fluid,
                                operation:Operation, drillBit:DrillBit,
                                mudPumpRate:number,
                                maxAllowableSurfacePressure:number, pumpEfficiency:number,
                                dischargeCoefficient:number, mudPumpRatePGM:number,
                                maxHorsePower:number):any
    {
        let fa:number = 0;
        let selectedRheologyModel:RheologyModel = RheologyModel.Newtonian;
        switch (fluid.rheologyModel)
        {
            case "Newtonian":
                selectedRheologyModel = RheologyModel.Newtonian;
                break;

            case "Bingham Plastic":
                selectedRheologyModel = RheologyModel.Bingham_Plastic;
                break;

            case "Power law":
                selectedRheologyModel = RheologyModel.Power_Law;
                break;

            case "Herschel Bulkley":
                selectedRheologyModel = RheologyModel.Herschel_Bulkley;
                break;
        }

        let baseOperationResults:BaseOperationResult[] = [];
        const mudDensity:number = mudPVTs[0].density / 7.48; //lb/ft3
        const plasticViscosity:number = mudPVTs[0].plasticViscoity;
        const yieldPoint:number = mudPVTs[0].yieldPoint;
        let ii:number = -1;
        const NumberOfBitNozzles:number = drillBit.numberOfBitNozzles;
        const Vp:number = 0;// operation.trippingInSpeed / 60.0;
        const bitSize:number = drillBit.bitSize;
        const BitArea:number = Optimization.bitArea(bitSize, NumberOfBitNozzles);
        const lastPipeOD:number = pipes[0].outerDiameter;
        const totalFlowRate:number = mudPumpRate;// Rate.flowRateBitOpenEnded(Vp, BitArea, lastPipeOD);
        let LastDepthResult:BaseOperationResult = new BaseOperationResult();
        const pipesLength = pipes.length;

        for (ii = 0; ii < pipesLength; ii++)
        {
            const pipe = pipes[ii];
            let baseOperationResult:OperationResult = new OperationResult();
            baseOperationResult.length = pipe.length;
            baseOperationResult.typeOfSection = pipe.typeOfSection;
            baseOperationResult.pipeOuterDiameter = pipe.outerDiameter;
            baseOperationResult.pipeInnerDiameter = pipe.innerDiameter;
            baseOperationResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
            baseOperationResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
            baseOperationResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
            baseOperationResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
            baseOperationResult.mudDensityAnnulus = mudDensity;
            baseOperationResult.mudDensityInsidePipe = mudDensity;
            baseOperationResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
            baseOperationResult.bottomMeasuredDepth = pipe.measuredDepth;
            baseOperationResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
            baseOperationResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
            baseOperationResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
            baseOperationResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;

            if (ii == 0)
            {
                LastDepthResult.length = pipe.length;
                LastDepthResult.typeOfSection = pipe.typeOfSection;
                LastDepthResult.pipeOuterDiameter = pipe.outerDiameter;
                LastDepthResult.pipeInnerDiameter = pipe.innerDiameter;
                LastDepthResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
                LastDepthResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
                LastDepthResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
                LastDepthResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
                LastDepthResult.mudDensityAnnulus = mudDensity;
                LastDepthResult.mudDensityInsidePipe = mudDensity;
                LastDepthResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
                LastDepthResult.bottomMeasuredDepth = pipe.measuredDepth;
                LastDepthResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
                LastDepthResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
                LastDepthResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
                LastDepthResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;
            }

            if (ii == 0)
            {
                LastDepthResult.InsidePipeFlowRate = totalFlowRate;// (1 - fa) * totalFlowRate;
                LastDepthResult.pipeFluidVelocity = Rate.VelocityInsidePipe(LastDepthResult.InsidePipeFlowRate, BitArea);
                baseOperationResult.nozzleVelocity = LastDepthResult.pipeFluidVelocity;
                //LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);


                baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                                                                            BitArea, LastDepthResult.InsidePipeFlowRate);
                baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
                                                            baseOperationResult.pipeInnerArea);

                baseOperationResult.OutsidePipeFlowRate = totalFlowRate; // fa * totalFlowRate;
                baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
                    baseOperationResult.annularArea);


            }
            else
            {
                baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                                                                            baseOperationResults[ii - 1].pipeInnerArea,
                                                                            baseOperationResults[ii - 1].InsidePipeFlowRate);
                baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
                                                            baseOperationResult.pipeInnerArea);
                baseOperationResult.OutsidePipeFlowRate = Rate.flowRateOutsidePipeOpenEnded(Vp, baseOperationResult.pipeOuterArea,
                                                                            baseOperationResults[ii - 1].pipeOuterArea,
                                                                            baseOperationResults[ii - 1].OutsidePipeFlowRate);
                baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
                    baseOperationResult.annularArea);

            }


            switch (selectedRheologyModel)
            {
                case RheologyModel.Newtonian:
                    baseOperationResult.fluidViscosity = plasticViscosity;// NewtonianViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM);
                    baseOperationResult.pipeReynoldsNumber = NewtonianReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
                                                            baseOperationResult.fluidViscosity, baseOperationResult.pipeInnerDiameter);
                    baseOperationResult.annulusReynoldsNumber = NewtonianReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
                                                            baseOperationResult.fluidViscosity,
                                                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

                    baseOperationResult.pipeCrticalFluidVelocity = 0;// BinghamVelocity.pipeCrticalFluidVelocity();
                    baseOperationResult.pipeCriticalFlowRate = 0;// BinghamVelocity.pipeCriticalFlowRate();
                    baseOperationResult.annularCrticalFluidVelocity = 0;// BinghamVelocity.annularCrticalFluidVelocity();
                    baseOperationResult.annularCriticalFlowRate = 0;// BinghamVelocity.annularCriticalFlowRate();

                    if (baseOperationResult.pipeReynoldsNumber < 2000)
                    {
                        baseOperationResult.pipeFlowRegime = "Laminar";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
                            baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
                            baseOperationResult.length);
                    }
                    else
                    {
                        baseOperationResult.pipeFlowRegime = "Turbulent";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
                                mudDensity, baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
                            baseOperationResult.length);
                    }

                    if (baseOperationResult.annulusReynoldsNumber < 2000)
                    {
                        baseOperationResult.annularFlowRegime = "Laminar";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
                            baseOperationResult.clingingConstant);

                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
                            baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }
                    else
                    {
                        baseOperationResult.annularFlowRegime = "Turbulent";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
                            baseOperationResult.clingingConstant);

                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureTurbulentInsideAnnulus(baseOperationResult.pipeFrictionFactor,
                                mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }

                    break;
                case RheologyModel.Bingham_Plastic:
                    baseOperationResult.fluidViscosity = plasticViscosity;// BinghamViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM,
                                                                            //fluid.fannDialReading, fluid.fannRPM);
                    baseOperationResult.yeildPoint = yieldPoint;// BinghamViscosity.YeildPoint(fluid.fannDialReading, fluid.fannRPM,
                                                                //baseOperationResult.fluidViscosity);
                    baseOperationResult.effectivePipeFluidViscosity = BinghamViscosity.pipeEffectiveViscosity(baseOperationResult.fluidViscosity,
                        baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint, baseOperationResult.pipeFluidVelocity);

                    baseOperationResult.pipeReynoldsNumber = BinghamReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
                                                            baseOperationResult.effectivePipeFluidViscosity, baseOperationResult.pipeInnerDiameter);

                    baseOperationResult.effectiveAnnulusFluidViscosity = BinghamViscosity.annularEffectiveViscosity(baseOperationResult.fluidViscosity,
                        baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter,
                        baseOperationResult.yeildPoint, baseOperationResult.annulusFluidVelocity);

                    baseOperationResult.annulusReynoldsNumber = BinghamReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
                                                            baseOperationResult.effectiveAnnulusFluidViscosity,
                                                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

                    if (ii == 0)
                    {
                        LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);
                        LastDepthResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.annulusFluidVelocity);

                        LastDepthResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarDrillBit(mudDensity, LastDepthResult.pipeEffectiveFluidVelocity);
                        LastDepthResult.annulusPressureLoss = 0;
                        LastDepthResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
                        baseOperationResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
                    }

                    baseOperationResult.pipeCrticalFluidVelocity = BinghamVelocity.pipeCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
                        baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint);
                    baseOperationResult.pipeCriticalFlowRate = BinghamVelocity.pipeCriticalFlowRate(baseOperationResult.pipeInnerDiameter,
                        baseOperationResult.pipeCrticalFluidVelocity);
                    baseOperationResult.annularCrticalFluidVelocity = BinghamVelocity.annularCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
                        baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.yeildPoint);
                    baseOperationResult.annularCriticalFlowRate = BinghamVelocity.annularCriticalFlowRate(baseOperationResult.pipeOuterDiameter,
                        baseOperationResult.holeSection.innerDiameter, baseOperationResult.annularCrticalFluidVelocity);

                    if (baseOperationResult.pipeReynoldsNumber < 2000)
                    {
                        baseOperationResult.pipeFlowRegime = "Laminar";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
                            baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter, baseOperationResult.length,
                            baseOperationResult.yeildPoint);
                    }
                    else
                    {
                        baseOperationResult.pipeFlowRegime = "Turbulent";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
                            mudDensity, baseOperationResult.pipeEffectiveFluidVelocity,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.length);
                    }

                    if (baseOperationResult.annulusReynoldsNumber < 2000)
                    {
                        baseOperationResult.annularFlowRegime = "Laminar";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
                            baseOperationResult.clingingConstant);
                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.annulusReynoldsNumber);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
                            baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length,
                            baseOperationResult.yeildPoint);
                    }
                    else
                    {
                        baseOperationResult.annularFlowRegime = "Turbulent";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
                            baseOperationResult.clingingConstant);
                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.annulusReynoldsNumber,
                            baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureTurbulentInsideAnnulus(baseOperationResult.annulusFrictionFactor,
                            mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }

                    break;
                default:
                    break;
            }




            //baseOperationResult.FormatResult();
            baseOperationResults.push(baseOperationResult);
        }

        let nCount:number = baseOperationResults.length;
        let sumPipePressureLoss:number = 0;
        let sumAnnulusPressureLoss:number = 0;
        let baseOperationResultsUpdated:BaseOperationResult[] = [];
        baseOperationResultsUpdated.push(LastDepthResult);
        for (ii = 0; ii < nCount; ii++)
        {
            baseOperationResultsUpdated.push(baseOperationResults[ii]);
        }
        ii = 0;
        nCount = baseOperationResultsUpdated.length;
        let equivalentCirculatingDensity:number = 0;
        let pipeHydrostatic:number = 0;
        let annularHydrostatic:number = 0;
        for (ii = nCount - 1; ii >= 0; ii--)
        {
            sumPipePressureLoss = sumPipePressureLoss + baseOperationResultsUpdated[ii].pipePressureLoss;
            sumAnnulusPressureLoss = sumAnnulusPressureLoss + baseOperationResultsUpdated[ii].annulusPressureLoss;
            baseOperationResultsUpdated[ii].totalPipePressureLoss = sumPipePressureLoss;
            baseOperationResultsUpdated[ii].totalAnnulusPressureLoss = sumAnnulusPressureLoss;
            equivalentCirculatingDensity = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth);
            baseOperationResultsUpdated[ii].equivalentCirculatingDensity = mudDensity + equivalentCirculatingDensity;
            baseOperationResultsUpdated[ii].tripPerStand = baseOperationResultsUpdated[ii].bottomMeasuredDepth / baseOperationResultsUpdated[ii].pipeEffectiveFluidVelocity;// Vp;

            pipeHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityInsidePipe * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;
            annularHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityAnnulus * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;

            baseOperationResultsUpdated[ii].surgePipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
                + pipeHydrostatic;
            baseOperationResultsUpdated[ii].swabPipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
                - pipeHydrostatic;

            baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                + annularHydrostatic;
            baseOperationResultsUpdated[ii].swabAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                - annularHydrostatic;

            baseOperationResultsUpdated[ii].eCDPipeSurge = mudDensity + (baseOperationResultsUpdated[ii].surgePipePressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
            baseOperationResultsUpdated[ii].eCDAnnulusSurge = mudDensity + (baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

            baseOperationResultsUpdated[ii].eCDPipeSwab = mudDensity + (baseOperationResultsUpdated[ii].swabPipePressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
            baseOperationResultsUpdated[ii].eCDAnnulusSwab = mudDensity + (baseOperationResultsUpdated[ii].swabAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

            //baseOperationResultsUpdated[ii].bitPressureLoss = 0;
            baseOperationResultsUpdated[ii].nozzleFlowArea = 0;
            baseOperationResultsUpdated[ii].bitHydraulicPower = 0;
            baseOperationResultsUpdated[ii].bitPowerOverArea = 0;
            baseOperationResultsUpdated[ii].nozzleVelocity = 0;
        }

        baseOperationResultsUpdated[0].parasticPressureLoss = baseOperationResultsUpdated[0].totalPipePressureLoss
            + baseOperationResultsUpdated[0].totalAnnulusPressureLoss + baseOperationResultsUpdated[0].surfacePressureLoss;
        baseOperationResultsUpdated[0].systemPressureLoss = baseOperationResultsUpdated[0].parasticPressureLoss
            + baseOperationResultsUpdated[0].bitPressureLoss;
        baseOperationResultsUpdated[0].bitPressureLoss = maxAllowableSurfacePressure - baseOperationResultsUpdated[0].parasticPressureLoss;
        if (baseOperationResultsUpdated[0].bitPressureLoss < 0) baseOperationResultsUpdated[0].bitPressureLoss = 0;
        baseOperationResultsUpdated[0].nozzleFlowArea = PressureLoss.NozzleFlowArea2(mudPumpRatePGM,
            mudDensity, this.allInputs.drillBit.dischargeCoefficient, baseOperationResultsUpdated[0].bitPressureLoss);
        baseOperationResultsUpdated[0].bitHydraulicPower = PressureLoss.BitHydraulicPower(mudPumpRatePGM, baseOperationResultsUpdated[0].bitPressureLoss,
            this.allInputs.rig.pumpEfficiency);
        baseOperationResultsUpdated[0].percentagebitHydraulicPower = (baseOperationResultsUpdated[0].bitHydraulicPower / maxHorsePower) * 100;
        //maxHorsePower * (baseOperationResults[0].bitPressureLoss / maxAllowableSurfacePressure);
        baseOperationResultsUpdated[0].bitPowerOverArea = baseOperationResultsUpdated[0].bitHydraulicPower / baseOperationResultsUpdated[0].nozzleFlowArea;
        baseOperationResultsUpdated[0].nozzleVelocity = PressureLoss.NozzleVelocity(mudPumpRatePGM, baseOperationResultsUpdated[0].nozzleFlowArea);
        baseOperationResultsUpdated[0].bitImpactForce = PressureLoss.HydraulicBitImpactForce3(mudDensity,
                            baseOperationResultsUpdated[0].bitPressureLoss, mudPumpRatePGM);

        for (ii = nCount - 1; ii >= 0; ii--)
        {
            baseOperationResultsUpdated[ii].bitPressureLoss = baseOperationResultsUpdated[0].bitPressureLoss;
            baseOperationResultsUpdated[ii].systemPressureLoss = baseOperationResultsUpdated[0].systemPressureLoss;
            baseOperationResultsUpdated[ii].maximumPumpPressure = this.allInputs.rig.maxAllowableSurfacePressure;
        }


        const residual:number = Math.abs(sumAnnulusPressureLoss - sumPipePressureLoss);

        return { residual, baseOperationResultsUpdated };
    }

    private static RunSurgeSwab2(pipes:Pipe[], holeSections:BaseHoleSectionModel[],
                                mudPVTs:MudPVTModel[], common:Common,
                                fluid:Fluid,
                                operation:Operation, drillBit:DrillBit, fa:number,
                                mudPumpRate:number,
                                maxAllowableSurfacePressure:number, pumpEfficiency:number,
                                dischargeCoefficient:number, mudPumpRatePGM:number,
                                maxHorsePower:number):any
    {
        
        let selectedRheologyModel:RheologyModel = RheologyModel.Newtonian;
        switch (fluid.rheologyModel)
        {
            case "Newtonian":
                selectedRheologyModel = RheologyModel.Newtonian;
                break;

            case "Bingham Plastic":
                selectedRheologyModel = RheologyModel.Bingham_Plastic;
                break;

            case "Power law":
                selectedRheologyModel = RheologyModel.Power_Law;
                break;

            case "Herschel Bulkley":
                selectedRheologyModel = RheologyModel.Herschel_Bulkley;
                break;
        }
        
        let baseOperationResults:BaseOperationResult[] = [];
        const mudDensity:number = mudPVTs[0].density/7.48; //lb/ft3
        const plasticViscosity:number = mudPVTs[0].plasticViscoity;
        const yieldPoint:number = mudPVTs[0].yieldPoint;
        let ii:number = -1;
        const NumberOfBitNozzles:number = drillBit.numberOfBitNozzles;
        const Vp:number = operation.trippingInSpeed/60.0;
        const bitSize:number = drillBit.bitSize;
        const BitArea:number = Optimization.bitArea(bitSize,NumberOfBitNozzles);
        const lastPipeOD:number = pipes[0].outerDiameter;
        const totalFlowRate:number = mudPumpRate;// Rate.flowRateBitOpenEnded(Vp, BitArea, lastPipeOD);
        let LastDepthResult:BaseOperationResult = new BaseOperationResult();
        const pipesLength = pipes.length;
        for (ii = 0; ii < pipesLength; ii++)
        {
            const pipe:Pipe = pipes[ii]
            let baseOperationResult:OperationResult = new OperationResult();
            baseOperationResult.length = pipe.length;
            baseOperationResult.typeOfSection = pipe.typeOfSection;
            baseOperationResult.pipeOuterDiameter = pipe.outerDiameter;
            baseOperationResult.pipeInnerDiameter = pipe.innerDiameter;
            baseOperationResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
            baseOperationResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
            baseOperationResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
            baseOperationResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
            baseOperationResult.mudDensityAnnulus = mudDensity;
            baseOperationResult.mudDensityInsidePipe = mudDensity;
            baseOperationResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
            baseOperationResult.bottomMeasuredDepth = pipe.measuredDepth;
            baseOperationResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
            baseOperationResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
            baseOperationResult.holeInnerArea= DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
            baseOperationResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;

            if(ii == 0)
            {
                LastDepthResult.length = pipe.length;
                LastDepthResult.typeOfSection = pipe.typeOfSection;
                LastDepthResult.pipeOuterDiameter = pipe.outerDiameter;
                LastDepthResult.pipeInnerDiameter = pipe.innerDiameter;
                LastDepthResult.absoluteRoughness = 0.000013;// pipe.absoluteRoughness;
                LastDepthResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
                LastDepthResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
                LastDepthResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
                LastDepthResult.mudDensityAnnulus = mudDensity;
                LastDepthResult.mudDensityInsidePipe = mudDensity;
                LastDepthResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
                LastDepthResult.bottomMeasuredDepth = pipe.measuredDepth;
                LastDepthResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;
                LastDepthResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
                LastDepthResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
                LastDepthResult.annularArea = baseOperationResult.holeInnerArea - baseOperationResult.pipeOuterArea;
            }

            if (ii == 0)
            {
                LastDepthResult.InsidePipeFlowRate = (1 - fa) * totalFlowRate;
                LastDepthResult.pipeFluidVelocity = Rate.VelocityInsidePipe(LastDepthResult.InsidePipeFlowRate, BitArea);
                baseOperationResult.nozzleVelocity = LastDepthResult.pipeFluidVelocity;
                //LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);


                baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                                                                            BitArea, LastDepthResult.InsidePipeFlowRate);
                baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
                                                            baseOperationResult.pipeInnerArea);

                baseOperationResult.OutsidePipeFlowRate = fa * totalFlowRate;
                baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
                    baseOperationResult.annularArea);
                

            }
            else
            {
                baseOperationResult.InsidePipeFlowRate = Rate.flowRatePipeOpenEnded(Vp, baseOperationResult.pipeInnerArea,
                                                                            baseOperationResults[ii-1].pipeInnerArea,
                                                                            baseOperationResults[ii-1].InsidePipeFlowRate);
                baseOperationResult.pipeFluidVelocity = Rate.VelocityInsidePipe(baseOperationResult.InsidePipeFlowRate,
                                                            baseOperationResult.pipeInnerArea);
                baseOperationResult.OutsidePipeFlowRate = Rate.flowRateOutsidePipeOpenEnded(Vp, baseOperationResult.pipeOuterArea,
                                                                            baseOperationResults[ii - 1].pipeOuterArea,
                                                                            baseOperationResults[ii - 1].OutsidePipeFlowRate);
                baseOperationResult.annulusFluidVelocity = Rate.VelocityInsideAnnulus(baseOperationResult.OutsidePipeFlowRate,
                    baseOperationResult.annularArea);

            }
        

            switch (selectedRheologyModel)
            {
                case RheologyModel.Newtonian:
                    baseOperationResult.fluidViscosity = plasticViscosity;// NewtonianViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM);
                    baseOperationResult.pipeReynoldsNumber = NewtonianReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
                                                            baseOperationResult.fluidViscosity, baseOperationResult.pipeInnerDiameter);
                    baseOperationResult.annulusReynoldsNumber = NewtonianReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
                                                            baseOperationResult.fluidViscosity,
                                                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

                    baseOperationResult.pipeCrticalFluidVelocity = 0;// BinghamVelocity.pipeCrticalFluidVelocity();
                    baseOperationResult.pipeCriticalFlowRate = 0;// BinghamVelocity.pipeCriticalFlowRate();
                    baseOperationResult.annularCrticalFluidVelocity = 0;// BinghamVelocity.annularCrticalFluidVelocity();
                    baseOperationResult.annularCriticalFlowRate = 0;// BinghamVelocity.annularCriticalFlowRate();

                    if (baseOperationResult.pipeReynoldsNumber < 2000)
                    {
                        baseOperationResult.pipeFlowRegime = "Laminar";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
                            baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
                            baseOperationResult.length);
                    }
                    else
                    {
                        baseOperationResult.pipeFlowRegime = "Turbulent";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.pipePressureLoss = FrictionalPressureNewton.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
                                mudDensity, baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter,
                            baseOperationResult.length);
                    }

                    if (baseOperationResult.annulusReynoldsNumber < 2000)
                    {
                        baseOperationResult.annularFlowRegime = "Laminar";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
                            baseOperationResult.clingingConstant);

                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
                            baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }
                    else
                    {
                        baseOperationResult.annularFlowRegime = "Turbulent";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.pipeFluidVelocity,
                            baseOperationResult.clingingConstant);

                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureNewton.PressureTurbulentInsideAnnulus(baseOperationResult.pipeFrictionFactor,
                                mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }

                    break;
                case RheologyModel.Bingham_Plastic:
                    baseOperationResult.fluidViscosity = plasticViscosity;// BinghamViscosity.PlasticViscosity(fluid.baseFannDialReading, fluid.baseFannRPM,
                                                                            //fluid.fannDialReading, fluid.fannRPM);
                    baseOperationResult.yeildPoint = yieldPoint;// BinghamViscosity.YeildPoint(fluid.fannDialReading, fluid.fannRPM,
                        //baseOperationResult.fluidViscosity);
                    baseOperationResult.effectivePipeFluidViscosity = BinghamViscosity.pipeEffectiveViscosity(baseOperationResult.fluidViscosity,
                        baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint, baseOperationResult.pipeFluidVelocity);

                    baseOperationResult.pipeReynoldsNumber = BinghamReNumber.pipeFlow(mudDensity, baseOperationResult.pipeFluidVelocity,
                                                            baseOperationResult.effectivePipeFluidViscosity, baseOperationResult.pipeInnerDiameter);

                    baseOperationResult.effectiveAnnulusFluidViscosity = BinghamViscosity.annularEffectiveViscosity(baseOperationResult.fluidViscosity,
                        baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter,
                        baseOperationResult.yeildPoint, baseOperationResult.annulusFluidVelocity);

                    baseOperationResult.annulusReynoldsNumber = BinghamReNumber.AnnularFlow(mudDensity, baseOperationResult.annulusFluidVelocity,
                                                            baseOperationResult.effectiveAnnulusFluidViscosity,
                                                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.pipeOuterDiameter);

                    if(ii == 0)
                    {
                        LastDepthResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.pipeFluidVelocity);
                        LastDepthResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, LastDepthResult.annulusFluidVelocity);

                        LastDepthResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarDrillBit(mudDensity, LastDepthResult.pipeEffectiveFluidVelocity);
                        LastDepthResult.annulusPressureLoss = 0;
                        LastDepthResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
                        baseOperationResult.bitPressureLoss = LastDepthResult.pipePressureLoss;
                    }

                    baseOperationResult.pipeCrticalFluidVelocity = BinghamVelocity.pipeCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
                        baseOperationResult.pipeInnerDiameter, baseOperationResult.yeildPoint);
                    baseOperationResult.pipeCriticalFlowRate = BinghamVelocity.pipeCriticalFlowRate(baseOperationResult.pipeInnerDiameter,
                        baseOperationResult.pipeCrticalFluidVelocity);
                    baseOperationResult.annularCrticalFluidVelocity = BinghamVelocity.annularCrticalFluidVelocity(baseOperationResult.fluidViscosity, mudDensity,
                        baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.yeildPoint);
                    baseOperationResult.annularCriticalFlowRate = BinghamVelocity.annularCriticalFlowRate(baseOperationResult.pipeOuterDiameter,
                        baseOperationResult.holeSection.innerDiameter, baseOperationResult.annularCrticalFluidVelocity);

                    if (baseOperationResult.pipeReynoldsNumber < 2000)
                    {
                        baseOperationResult.pipeFlowRegime = "Laminar";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeLaminarFlow(baseOperationResult.pipeReynoldsNumber);
                        baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureLaminarInsidePipe(baseOperationResult.fluidViscosity,
                            baseOperationResult.pipeEffectiveFluidVelocity, baseOperationResult.pipeInnerDiameter, baseOperationResult.length,
                            baseOperationResult.yeildPoint);
                    }
                    else
                    {
                        baseOperationResult.pipeFlowRegime = "Turbulent";
                        baseOperationResult.pipeEffectiveFluidVelocity = Rate.EffectiveVelocityInsidePipe(Vp, baseOperationResult.pipeFluidVelocity);
                        baseOperationResult.pipeFrictionFactor = newtonianFrictionFactor.pipeTurbulentFlow(baseOperationResult.pipeReynoldsNumber,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.pipePressureLoss = FrictionalPressureBingham.PressureTurbulentInsidePipe(baseOperationResult.pipeFrictionFactor,
                            mudDensity,  baseOperationResult.pipeEffectiveFluidVelocity,
                            baseOperationResult.pipeInnerDiameter, baseOperationResult.length);
                    }

                    if (baseOperationResult.annulusReynoldsNumber < 2000)
                    {
                        baseOperationResult.annularFlowRegime = "Laminar";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantLaminar(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
                            baseOperationResult.clingingConstant);
                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularLaminarFlow(baseOperationResult.annulusReynoldsNumber);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureLaminarInsideAnnulus(baseOperationResult.fluidViscosity,
                            baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length,
                            baseOperationResult.yeildPoint);
                    }
                    else
                    {
                        baseOperationResult.annularFlowRegime = "Turbulent";
                        baseOperationResult.clingingConstant = Rate.ClingingConstantTurbulent(baseOperationResult.holeSection.innerDiameter,
                                                                    baseOperationResult.pipeOuterDiameter);
                        baseOperationResult.annulusEffectiveFluidVelocity = Rate.EffectiveVelocityInsideAnnulus(Vp, baseOperationResult.annulusFluidVelocity,
                            baseOperationResult.clingingConstant);
                        baseOperationResult.annulusFrictionFactor = newtonianFrictionFactor.annularTurbulentFlow(baseOperationResult.annulusReynoldsNumber,
                            baseOperationResult.pipeOuterDiameter, baseOperationResult.holeSection.innerDiameter, baseOperationResult.absoluteRoughness);
                        baseOperationResult.annulusPressureLoss = FrictionalPressureBingham.PressureTurbulentInsideAnnulus(baseOperationResult.annulusFrictionFactor,
                            mudDensity, baseOperationResult.annulusEffectiveFluidVelocity, baseOperationResult.pipeOuterDiameter,
                            baseOperationResult.holeSection.innerDiameter, baseOperationResult.length);
                    }
            
                    break;
                default:
                    break;
            }




            //baseOperationResult.FormatResult();
            baseOperationResults.push(baseOperationResult);
        }

        let nCount:number = baseOperationResults.length;
        let sumPipePressureLoss:number = 0;
        let sumAnnulusPressureLoss:number = 0;
        let baseOperationResultsUpdated:BaseOperationResult[] = [];
    baseOperationResultsUpdated.push(LastDepthResult);
        for (ii = 0; ii < nCount; ii++)
        {
            baseOperationResultsUpdated.push(baseOperationResults[ii]);
        }
        ii = 0;
        nCount = baseOperationResultsUpdated.length;
        let equivalentCirculatingDensity:number = 0;
        let pipeHydrostatic:number = 0;
        let annularHydrostatic:number = 0;
        for (ii = nCount - 1; ii >= 0; ii--)
        {
            sumPipePressureLoss = sumPipePressureLoss + baseOperationResultsUpdated[ii].pipePressureLoss;
            sumAnnulusPressureLoss = sumAnnulusPressureLoss + baseOperationResultsUpdated[ii].annulusPressureLoss;
            baseOperationResultsUpdated[ii].totalPipePressureLoss = sumPipePressureLoss;
            baseOperationResultsUpdated[ii].totalAnnulusPressureLoss = sumAnnulusPressureLoss;
            equivalentCirculatingDensity = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth);
            baseOperationResultsUpdated[ii].equivalentCirculatingDensity = mudDensity + equivalentCirculatingDensity;
            baseOperationResultsUpdated[ii].tripPerStand = baseOperationResultsUpdated[ii].bottomMeasuredDepth / Vp;

            pipeHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityInsidePipe * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;
            annularHydrostatic = 0.052 * baseOperationResultsUpdated[ii].mudDensityAnnulus * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth;

            baseOperationResultsUpdated[ii].surgePipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
                + pipeHydrostatic;
            baseOperationResultsUpdated[ii].swabPipePressureLoss = baseOperationResultsUpdated[ii].totalPipePressureLoss
                - pipeHydrostatic;

            baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                + annularHydrostatic;
            baseOperationResultsUpdated[ii].swabAnnulusPressureLoss = baseOperationResultsUpdated[ii].totalAnnulusPressureLoss
                - annularHydrostatic;

            baseOperationResultsUpdated[ii].eCDPipeSurge = mudDensity + (baseOperationResultsUpdated[ii].surgePipePressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
            baseOperationResultsUpdated[ii].eCDAnnulusSurge = mudDensity + (baseOperationResultsUpdated[ii].surgeAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

            baseOperationResultsUpdated[ii].eCDPipeSwab = mudDensity + (baseOperationResultsUpdated[ii].swabPipePressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));
            baseOperationResultsUpdated[ii].eCDAnnulusSwab = mudDensity + (baseOperationResultsUpdated[ii].swabAnnulusPressureLoss
                / (0.052 * baseOperationResultsUpdated[ii].bottomTrueVerticalDepth));

            //baseOperationResultsUpdated[ii].bitPressureLoss = 0;
            baseOperationResultsUpdated[ii].nozzleFlowArea = 0;
            baseOperationResultsUpdated[ii].bitHydraulicPower = 0;
            baseOperationResultsUpdated[ii].bitPowerOverArea = 0;
            baseOperationResultsUpdated[ii].nozzleVelocity = 0;
        }

        baseOperationResultsUpdated[0].parasticPressureLoss = baseOperationResultsUpdated[0].totalPipePressureLoss
            + baseOperationResultsUpdated[0].totalAnnulusPressureLoss + baseOperationResultsUpdated[0].surfacePressureLoss;
        baseOperationResultsUpdated[0].systemPressureLoss = baseOperationResultsUpdated[0].parasticPressureLoss
            + baseOperationResultsUpdated[0].bitPressureLoss;
        //baseOperationResultsUpdated[0].bitPressureLoss = maxAllowableSurfacePressure - baseOperationResultsUpdated[0].parasticPressureLoss;
        //if (baseOperationResultsUpdated[0].bitPressureLoss < 0) baseOperationResultsUpdated[0].bitPressureLoss = 0;
        baseOperationResultsUpdated[0].bitPressureLoss = PressureLoss.AcrossBit(mudPumpRatePGM,
            mudDensity, this.allInputs.drillBit.dischargeCoefficient, BitArea);
        if (baseOperationResultsUpdated[0].bitPressureLoss < 0) baseOperationResultsUpdated[0].bitPressureLoss = 0;
        baseOperationResultsUpdated[0].nozzleFlowArea = BitArea;// PressureLoss.NozzleFlowArea(mudPumpRatePGM,
            //mudDensity, allInputs.drillBit.dischargeCoefficient, baseOperationResultsUpdated[0].bitPressureLoss);
        baseOperationResultsUpdated[0].bitHydraulicPower = PressureLoss.BitHydraulicPower(mudPumpRatePGM, baseOperationResultsUpdated[0].bitPressureLoss,
            this.allInputs.rig.pumpEfficiency);
        baseOperationResultsUpdated[0].percentagebitHydraulicPower = (baseOperationResultsUpdated[0].bitHydraulicPower / maxHorsePower) * 100;
        //maxHorsePower * (baseOperationResults[0].bitPressureLoss / maxAllowableSurfacePressure);
        baseOperationResultsUpdated[0].bitPowerOverArea = baseOperationResultsUpdated[0].bitHydraulicPower / baseOperationResultsUpdated[0].nozzleFlowArea;
        baseOperationResultsUpdated[0].nozzleVelocity = PressureLoss.NozzleVelocity(mudPumpRatePGM, baseOperationResultsUpdated[0].nozzleFlowArea);
        baseOperationResultsUpdated[0].bitImpactForce = PressureLoss.HydraulicBitImpactForce2(mudDensity,
                            baseOperationResultsUpdated[0].bitPressureLoss, mudPumpRatePGM);

        for (ii = nCount - 1; ii >= 0; ii--)
        {
            baseOperationResultsUpdated[ii].bitPressureLoss = baseOperationResultsUpdated[0].bitPressureLoss;
            baseOperationResultsUpdated[ii].systemPressureLoss = baseOperationResultsUpdated[0].systemPressureLoss;
            baseOperationResultsUpdated[ii].maximumPumpPressure = this.allInputs.rig.maxAllowableSurfacePressure;

            //var props = baseOperationResultsUpdated[ii].GetType().GetProperties();
            //bool check = false;
            //foreach (var prop in props)
            //{
            //    if(prop.GetValue(baseOperationResultsUpdated[ii]) is double)
            //    {
            //        double aa = Convert.ToDouble(prop.GetValue(baseOperationResultsUpdated[ii]));
            //        if(double.IsNaN(aa) || double.IsInfinity(aa))
            //        {
            //            check = true;
            //        }

            //    }
            //}
    }




        const residual:number = Math.abs(sumAnnulusPressureLoss - sumPipePressureLoss);

        return { residual, baseOperationResultsUpdated };
    }

}