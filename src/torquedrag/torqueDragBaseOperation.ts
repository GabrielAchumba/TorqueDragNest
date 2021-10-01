import { BaseHoleSectionModel } from "src/models/baseholesection";
import { Pipe } from "src/models/basepipe";
import { Common } from "src/models/common";
import { Section2D } from "src/models/enums";
import { MudPVTModel } from "src/models/mudpvt";
import { BaseOperationResult } from "src/models/operationResult";
import { DoglegSeverity } from "src/schematicsanalysis/doglegSeverity";
import { HoleUtils } from "src/schematicsanalysis/holeUtils";
import { Buckling } from "./drillingengineering/buckling";
import { DrillingStrings } from "./drillingengineering/drillingStrings";
import { Inertia_Clearance } from "./drillingengineering/inertia_Clearance";

export class TorqueDragBaseOperation {

    private static RunBaseOperation(pipes:Pipe[], holeSections:BaseHoleSectionModel[],
        doglegSeverityMethod:string, mudPVTs:MudPVTModel[], common:Common):any
    {
        const pi:number = Math.PI;
        const angle180:number = 180.0;
        const M:number = 100.0;
        let baseOperationResults:BaseOperationResult[] = [];
        const mudDensity:number = mudPVTs[0].density; //lb/ft3
        const youngModulus:number = common.youngsModulus * Math.pow(10, 6);// 30 * Math.Pow(10, 6);
        const blockWeight:number = common.blockWeight * M;
        const annulusSurfacePressure:number = 14.7; //psi
        const pipeSurfacePressure:number = 14.7; //psi;
        let ii:number = -1; const nCount:number = pipes.length;
        let tensileStrengths:number[] = [];
        const percentOfYield:number = (common.percentOfYield / 100.0);

        if (common.bucklingLimitFactor == null)
        {
            common.bucklingLimitFactor = 1.0;
        }

        const pipesLength:number = pipes.length;
        for (ii = 0; ii < pipesLength; ii++)
        {
            const pipe:Pipe = pipes[ii];
            let baseOperationResult:BaseOperationResult = new BaseOperationResult();
            baseOperationResult.length = pipe.length;
            baseOperationResult.typeOfSection = pipe.typeOfSection;
            baseOperationResult.pipeOuterDiameter = pipe.outerDiameter;
            baseOperationResult.pipeInnerDiameter = pipe.innerDiameter;
            baseOperationResult.pipeOuterArea = DrillingStrings.PipeArea(pipe.outerDiameter);
            baseOperationResult.pipeInnerArea = DrillingStrings.PipeArea(pipe.innerDiameter);
            baseOperationResult.crossSectionalArea = baseOperationResult.pipeOuterArea - baseOperationResult.pipeInnerArea;
            baseOperationResult.pipeUnitWeight = pipe.weight;// DrillingStrings.DrillPipeUnitWeight(pipe.outerDiameter, pipe.innerDiameter);
            baseOperationResult.mudDensityAnnulus = mudDensity;
            baseOperationResult.mudDensityInsidePipe = mudDensity;
            baseOperationResult.pipeTotalWeight = DrillingStrings.DrillPipeTotalWeight(baseOperationResult.pipeUnitWeight, pipe.length);
            baseOperationResult.buoyancyFactor = DrillingStrings.BuoyancyFactor(mudDensity);
            baseOperationResult.buoyancyWeight = DrillingStrings.TotalBuoyancyWeight(baseOperationResult.pipeTotalWeight, baseOperationResult.buoyancyFactor);
            baseOperationResult.tensileStrength = DrillingStrings.TensileStrength(pipe.outerDiameter,
            pipe.innerDiameter, pipe.minimumYieldStrength * M) * percentOfYield;
            baseOperationResult.yeildStrength = pipe.minimumYieldStrength;
            baseOperationResult.percentOfYield = percentOfYield;
            tensileStrengths.push(baseOperationResult.tensileStrength);




            baseOperationResult.topMeasuredDepth = pipe.measuredDepth - pipe.length;
            baseOperationResult.bottomMeasuredDepth = pipe.measuredDepth;
            baseOperationResult.topInclination = Math.abs(pipe.topInclination);
            baseOperationResult.bottomInclination = Math.abs(pipe.bottomInclination);
            baseOperationResult.topAzimuth = pipe.topAzimuth;
            baseOperationResult.bottomAzimuth = pipe.bottomAzimuth;
            baseOperationResult.topTrueVerticalDepth = pipe.topTrueVerticalDepth;
            baseOperationResult.bottomTrueVerticalDepth = pipe.bottomTrueVerticalDepth;



            baseOperationResult.dogLegSeverity = DoglegSeverity.DogLegSeverity(pipe.length, baseOperationResult.topInclination, baseOperationResult.bottomInclination,
                    baseOperationResult.topAzimuth, baseOperationResult.bottomAzimuth, doglegSeverityMethod,
                    pipe.dogleg);

            baseOperationResult.holeSection = HoleUtils.GetHoleSection(baseOperationResult.bottomMeasuredDepth, holeSections);
            baseOperationResult.radialClearance = Inertia_Clearance.RadialClearance(baseOperationResult.holeSection.innerDiameter, pipe.outerDiameter);
            baseOperationResult.holeInnerArea = DrillingStrings.PipeArea(baseOperationResult.holeSection.innerDiameter);
            baseOperationResult.momentOfInertia = Inertia_Clearance.MomentOfInertia(pipe.outerDiameter, pipe.innerDiameter);
            baseOperationResult.polarMomentOfInertia = Inertia_Clearance.PolarMomentOfInertia(pipe.outerDiameter, pipe.innerDiameter);
            baseOperationResult.youngsModulus = youngModulus;

            baseOperationResult.changeInInclination = pipe.bottomInclination - pipe.topInclination;

            baseOperationResult.changeInAzimuth = pipe.bottomAzimuth - pipe.topAzimuth;

            baseOperationResult.averageInclination = ((pipe.bottomInclination + pipe.topInclination) / 2.0) * Math.PI/180.0;

            if (pipe.bottomInclination == 0 && baseOperationResult.changeInInclination == 0 &&
            baseOperationResult.changeInAzimuth == 0) baseOperationResult.section2D = Section2D.Vertical.toString();
            if (baseOperationResult.changeInInclination > 0 &&
            baseOperationResult.changeInAzimuth == 0) baseOperationResult.section2D = Section2D.Build_up.toString();
            if (baseOperationResult.changeInInclination < 0 &&
            baseOperationResult.changeInAzimuth == 0) baseOperationResult.section2D = Section2D.Drop_off.toString();
            if (baseOperationResult.changeInInclination == 0 && baseOperationResult.changeInAzimuth > 0 ||
            baseOperationResult.changeInAzimuth < 0) baseOperationResult.section2D = Section2D.Side_bend.toString();
            if (pipe.bottomInclination == 90 && baseOperationResult.changeInInclination == 0 &&
            baseOperationResult.changeInAzimuth == 0) baseOperationResult.section2D = Section2D.Horizontal.toString();


            baseOperationResult.criticalInclinationAngle = Buckling.CriticalInclinationAngle(youngModulus,
            baseOperationResult.buoyancyFactor, baseOperationResult.radialClearance);

            let IsDeviatedWell:boolean = false;
            const unitBuoyedWeight:number = baseOperationResult.buoyancyFactor * baseOperationResult.pipeUnitWeight / 12.0;
            if (baseOperationResult.bottomInclination < baseOperationResult.criticalInclinationAngle)
            {
            baseOperationResult.criticalSinusoidalBuckling = common.bucklingLimitFactor * (Buckling.CriticalSinusoidalBuckling(youngModulus * baseOperationResult.momentOfInertia,
            unitBuoyedWeight) + blockWeight);

            baseOperationResult.criticalHelicalBuckling = common.bucklingLimitFactor * (Buckling.CriticalHelicalBuckling(youngModulus * baseOperationResult.momentOfInertia,
            unitBuoyedWeight) + blockWeight);
            }
            else
            {
            IsDeviatedWell = true;
            baseOperationResult.criticalSinusoidalBuckling = common.bucklingLimitFactor * (Buckling.CriticalSinusoidalBuckling(youngModulus * baseOperationResult.momentOfInertia,
            unitBuoyedWeight, baseOperationResult.averageInclination,
            baseOperationResult.radialClearance, IsDeviatedWell) + blockWeight);

            baseOperationResult.criticalHelicalBuckling = common.bucklingLimitFactor * (Buckling.CriticalHelicalBuckling(youngModulus * baseOperationResult.momentOfInertia,
            unitBuoyedWeight, baseOperationResult.averageInclination,
            baseOperationResult.radialClearance, IsDeviatedWell) + blockWeight);
            }

            baseOperationResults.push(baseOperationResult);
        }

        let sumPo:number = 0, sumPi:number = 0, conversionFactor:number = 0.052;
        let changeInPressurePipe:number = 0, changeInPressureAnnulus:number = 0;
        let changeInForcePipe:number = 0, changeInForceAnnulus:number = 0;
        let i:number = 0;
        for (i = nCount - 1; i >= 0; i--)
        {
            changeInPressureAnnulus = conversionFactor * (baseOperationResults[i].mudDensityAnnulus / 7.481) * baseOperationResults[i].bottomTrueVerticalDepth;
            changeInPressurePipe = conversionFactor * (baseOperationResults[i].mudDensityInsidePipe / 7.481) * baseOperationResults[i].bottomTrueVerticalDepth; ;
            sumPo = sumPo + changeInPressureAnnulus;
            sumPi = sumPi + changeInPressurePipe;
            changeInForcePipe = changeInPressurePipe * baseOperationResults[i].pipeInnerArea;
            changeInForceAnnulus = changeInPressureAnnulus * (baseOperationResults[i].holeInnerArea - baseOperationResults[i].pipeOuterArea);

            if (i == nCount - 1)
            {
            baseOperationResults[i].annulusHydrostaticPressureTop = annulusSurfacePressure;
            baseOperationResults[i].insidePipeHydrostaticPressureTop = pipeSurfacePressure;
            baseOperationResults[i].annulusHydrostaticPressure = annulusSurfacePressure + sumPo;
            baseOperationResults[i].insidePipeHydrostaticPressure = pipeSurfacePressure + sumPi;
            }
            else
            {
            baseOperationResults[i].annulusHydrostaticPressureTop = baseOperationResults[i + 1].annulusHydrostaticPressure;
            baseOperationResults[i].insidePipeHydrostaticPressureTop = baseOperationResults[i + 1].insidePipeHydrostaticPressure;
            baseOperationResults[i].annulusHydrostaticPressure = annulusSurfacePressure + sumPo;
            baseOperationResults[i].insidePipeHydrostaticPressure = pipeSurfacePressure + sumPi;
            }

            baseOperationResults[i].insidePipeHydrostaticChange = baseOperationResults[i].insidePipeHydrostaticPressure
            - baseOperationResults[i].insidePipeHydrostaticPressureTop;
            baseOperationResults[i].annulusHydrostaticChange = baseOperationResults[i].annulusHydrostaticPressure
            - baseOperationResults[i].annulusHydrostaticPressureTop;

            baseOperationResults[i].pipeBottomPressureForce = baseOperationResults[i].insidePipeHydrostaticPressure *
            baseOperationResults[i].pipeInnerArea;

            baseOperationResults[i].annulusBottomPressureForce = baseOperationResults[i].annulusHydrostaticPressure *
            (baseOperationResults[i].holeInnerArea - baseOperationResults[i].pipeOuterArea);

            baseOperationResults[i].pressureLoss = baseOperationResults[i].annulusHydrostaticPressure - baseOperationResults[i].insidePipeHydrostaticPressure;
            const dh2:number = Math.pow(baseOperationResults[i].holeSection.innerDiameter, 2);
            const dbo2:number = Math.pow(baseOperationResults[i].pipeOuterArea, 2);
            baseOperationResults[i].fluidDragForce = (Math.PI * baseOperationResults[i].pressureLoss * (dh2 - dbo2) *
            baseOperationResults[i].pipeOuterArea) / (4.0 * (baseOperationResults[i].holeSection.innerDiameter
            - baseOperationResults[i].pipeOuterArea));
            baseOperationResults[i].bucklingStabilityForce = changeInForceAnnulus
            - changeInForcePipe;



        }

        const weakeastTensileStrenth:number = Math.min(...tensileStrengths);

        return { weakeastTensileStrenth, baseOperationResults };
    }
}