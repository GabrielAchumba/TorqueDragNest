import { Pipe } from "src/models/basepipe";
import { Common } from "src/models/common";
import { AreaType } from "src/models/enums";
import { MudPVTModel } from "src/models/mudpvt";
import { Operation } from "src/models/operation";
import { BaseOperationResult, OperationResult } from "src/models/operationResult";
import { Drag } from "./drillingengineering/drag";
import { Stress } from "./drillingengineering/stress";
import { Torque } from "./drillingengineering/torque";

export class SlideDrilling {

    public static  RunSlideDrillingOperation(pipes:Pipe[], operation:Operation,
        mudPVTs:MudPVTModel[], common:Common,
        baseOperationResults:BaseOperationResult[], weakeastTensileStrenth:number,
        casingFF:number = null, openHoleFF:number = null):OperationResult[]
    {
        let operationResults:OperationResult[] = [];
        let ii:number = -1;
        const M:number = 1000.0;
        let Fds:number[] = [];
        const plasticViscosity:number = mudPVTs[0].plasticViscoity;
        const angleConverter:number = Math.PI * 180;
        let frictionFactor:number = 0;
        const pipesLength = pipes.length;
    for (ii = 0; ii < pipesLength; ii++)
    {
        const pipe:Pipe = pipes[ii];
        let operationResult:OperationResult = new OperationResult();

        let baseOperationResult:BaseOperationResult = baseOperationResults[ii];
        operationResult.length = baseOperationResult.length;
        operationResult.pipeInnerDiameter = baseOperationResult.pipeInnerDiameter;
        operationResult.pipeOuterDiameter = baseOperationResult.pipeOuterDiameter;
        operationResult.pipeOuterArea = baseOperationResult.pipeOuterArea;
        operationResult.pipeOuterArea = baseOperationResult.pipeOuterArea;
        operationResult.crossSectionalArea = baseOperationResult.crossSectionalArea;
        operationResult.typeOfSection = baseOperationResult.typeOfSection;
        operationResult.pipeOuterArea = baseOperationResult.pipeOuterArea;
        operationResult.pipeInnerArea = baseOperationResult.pipeInnerArea;
        operationResult.pipeUnitWeight = baseOperationResult.pipeUnitWeight;
        operationResult.pipeTotalWeight = baseOperationResult.pipeTotalWeight;
        operationResult.buoyancyFactor = baseOperationResult.buoyancyFactor;
        operationResult.buoyancyWeight = baseOperationResult.buoyancyWeight;
        operationResult.yeildStrength = baseOperationResult.yeildStrength;
        operationResult.tensileStrength = baseOperationResult.tensileStrength;
        operationResult.topMeasuredDepth = baseOperationResult.topMeasuredDepth;
        operationResult.bottomMeasuredDepth = baseOperationResult.bottomMeasuredDepth;
        operationResult.changeInInclination = baseOperationResult.changeInInclination * angleConverter;
        operationResult.changeInAzimuth = baseOperationResult.changeInAzimuth * angleConverter;
        operationResult.topInclination = baseOperationResult.topInclination * angleConverter;
        operationResult.bottomInclination = baseOperationResult.bottomInclination * angleConverter;
        operationResult.topAzimuth = baseOperationResult.topAzimuth * angleConverter;
        operationResult.bottomAzimuth = baseOperationResult.bottomAzimuth * angleConverter;
        operationResult.dogLegSeverity = baseOperationResult.dogLegSeverity;
        operationResult.holeSection = baseOperationResult.holeSection;
        operationResult.radialClearance = baseOperationResult.radialClearance;
        operationResult.momentOfInertia = baseOperationResult.momentOfInertia;
        operationResult.polarMomentOfInertia = baseOperationResult.polarMomentOfInertia;
        operationResult.criticalInclinationAngle = baseOperationResult.criticalInclinationAngle;
        operationResult.criticalSinusoidalBuckling = baseOperationResult.criticalSinusoidalBuckling;
        operationResult.criticalHelicalBuckling = baseOperationResult.criticalHelicalBuckling;
        operationResult.criticalHelicalBuckling = baseOperationResult.criticalHelicalBuckling;
        operationResult.annulusHydrostaticPressureTop = baseOperationResult.annulusHydrostaticPressureTop;
        operationResult.insidePipeHydrostaticPressureTop = baseOperationResult.insidePipeHydrostaticPressureTop;
        operationResult.annulusHydrostaticPressure = baseOperationResult.annulusHydrostaticPressure;
        operationResult.insidePipeHydrostaticPressure = baseOperationResult.insidePipeHydrostaticPressure;
        operationResult.insidePipeHydrostaticChange = baseOperationResult.insidePipeHydrostaticChange;
        operationResult.annulusHydrostaticChange = baseOperationResult.annulusHydrostaticChange;
        operationResult.percentOfYield = baseOperationResult.percentOfYield;
        operationResult.youngsModulus = baseOperationResult.youngsModulus;
        operationResult.section2D = baseOperationResult.section2D;
        operationResult.mudDensityInsidePipe = baseOperationResult.mudDensityInsidePipe;
        operationResult.mudDensityAnnulus = baseOperationResult.mudDensityAnnulus;
        operationResult.annulusHydrostaticPressure = baseOperationResult.annulusHydrostaticPressure;
        operationResult.insidePipeHydrostaticPressure = baseOperationResult.insidePipeHydrostaticPressure;
        operationResult.annulusBottomPressureForce = baseOperationResult.annulusBottomPressureForce;
        operationResult.pipeBottomPressureForce = baseOperationResult.pipeBottomPressureForce;
        operationResult.pressureLoss = baseOperationResult.pressureLoss;
        operationResult.fluidDragForce = baseOperationResult.fluidDragForce;
        operationResult.bucklingStabilityForce = baseOperationResult.bucklingStabilityForce;
        operationResult.averageInclination = baseOperationResult.averageInclination;
        operationResult.holeInnerArea = baseOperationResult.holeInnerArea;

        frictionFactor = operationResult.holeSection.frictionFactor;

        if (operationResult.holeSection.typeOfHole.toLowerCase() == "open hole")
        {
        if (openHoleFF != null)
        frictionFactor = openHoleFF;
        }
        else
        {
        if (casingFF != null)
        frictionFactor = casingFF;
        }


        if (ii == 0)
        {
        operationResult.tensionBottomOfPipe = -operation.weightOnBitIDHM * M;
        operationResult.torqueBottom = operation.torqueAtBit;
        }
        else
        {
        operationResult.tensionBottomOfPipe = operationResults[ii - 1].tensionTopOfPipe;
        operationResult.torqueBottom = operationResults[ii - 1].torqueTop;
        }

        if (ii == 0) operationResult.ChangeIntension = operationResult.tensionBottomOfPipe;
        else operationResult.ChangeIntension = operationResults[ii - 1].ChangeIntension;

        operationResult.normalForce = Drag.NormalForce(operationResult.tensionBottomOfPipe, pipe.averageInclination,
        operationResult.changeInAzimuth, operationResult.buoyancyWeight, operationResult.changeInInclination);

        operationResult.ChangeIntension = operationResult.buoyancyWeight *
        Math.cos(pipe.averageInclination)
        - frictionFactor
        * operationResult.normalForce;

        operationResult.tensionTopOfPipe = operationResult.tensionBottomOfPipe + operationResult.ChangeIntension;

        const dragF:number = Drag.DragForce(operationResult.normalForce,
        frictionFactor,
        1, 1, operationResult.pipeOuterDiameter, 1);

        Fds.push(dragF);

        if (ii == 0) operationResult.totalDrag = dragF;
        else operationResult.totalDrag = operationResults[ii - 1].totalDrag + dragF;

        operationResult.HookeLoadAtJoint = 0;


        operationResult.torqueChange = Torque.TorqueIncrement(operationResult.normalForce,
        frictionFactor, pipe.outerDiameter / 2.0,
        1, 1, 1);

        const dh2:number = Math.pow(baseOperationResult.holeSection.innerDiameter, 2);
        const dbo2:number = Math.pow(baseOperationResult.pipeOuterArea, 2);

        operationResult.shearRateInAnnulus = (4 * Math.PI * operation.trippingInRPM / 60) /
        (dbo2 * ((1 / dbo2) - (1 / dh2)));
        const initialShearStress:number = 0;
        operationResult.shearStress = Stress.ShearStress(initialShearStress, plasticViscosity, operationResult.shearRateInAnnulus);

        operationResult.torqueFromShearStress = operationResult.shearStress * 2 * Math.PI
        * operationResult.length * Math.pow(operationResult.pipeOuterDiameter, 2) / 24;
        operationResult.torqueChange = Torque.TorqueIncrement(operationResult.normalForce,
        frictionFactor, operationResult.pipeOuterDiameter / 2.0,
        operation.trippingInSpeed, operation.trippingInRPM, 0);// + operationResult.torqueFromShearStress;
        operationResult.torqueAngle = (frictionFactor / (1 + Math.pow(frictionFactor, 2))) * operationResult.torqueChange;

        const tensionTopOfPipe:number = Math.abs(operationResult.tensionTopOfPipe);
        const diffTensionBuckling:number = Math.abs(tensionTopOfPipe - operationResult.criticalSinusoidalBuckling);

        operationResult.pipeRotationAngle = Math.atan((tensionTopOfPipe * operationResult.changeInAzimuth *
        Math.sin(operationResult.averageInclination)) /
        tensionTopOfPipe * operationResult.changeInInclination
        + operationResult.buoyancyWeight * Math.sin(operationResult.averageInclination))
        + Math.atan(frictionFactor);
        operationResult.maxAxialStress = operationResult.buoyancyWeight
        / (operationResult.pipeOuterArea - operationResult.pipeInnerArea);
        operationResult.maxBendingStress = 20000 * (1 - (operationResult.maxAxialStress / 145000));
        const EI:number = operationResult.youngsModulus * operationResult.momentOfInertia;
        const k:number = Math.sqrt(tensionTopOfPipe / (EI));
        const L:number = 180;//inches
        operationResult.maxDoglegSeverity = (432000 * operationResult.maxBendingStress / (Math.PI * operationResult.youngsModulus
        * operationResult.pipeOuterDiameter)) * Math.atan(k * L) / (k * L);
        operationResult.angleSinusoidalBuckling = 1.1227 / (Math.sqrt(2 * EI)) * Math.pow(tensionTopOfPipe, 0.04) *
        Math.pow(diffTensionBuckling, 0.46);
        operationResult.angleHelicalBuckling = Math.sqrt(Math.abs(tensionTopOfPipe) / (2 * EI));
        operationResult.pitchHelical = (2 * Math.PI) / operationResult.angleHelicalBuckling;
        operationResult.dogLegFromHelical = 68755 * operationResult.radialClearance * Math.pow(operationResult.angleHelicalBuckling, 2);
        const beta:number = Math.sqrt(tensionTopOfPipe / (2 * EI));
        const term1:number = Math.pow(operationResult.radialClearance, 2);
        const term2:number = (1 - term1) * Math.pow(beta, 2);
        const term3:number = (2 * Math.sqrt(term2));
        operationResult.torequeFromHelical = tensionTopOfPipe * Math.pow(operationResult.radialClearance, 2) * beta / term3;
        operationResult.shearStressFromHelical = tensionTopOfPipe * operationResult.radialClearance * beta / term3;

        operationResult.strainSinusoidal = -0.7285 * Math.pow(operationResult.radialClearance, 2) *
        Math.pow(tensionTopOfPipe, 0.08) *
        Math.pow(diffTensionBuckling, 0.92);

        operationResult.strainHelical = Math.pow(operationResult.radialClearance, 2) * tensionTopOfPipe / (4 * EI);
        operationResult.sideForeceFromHelical = operationResult.radialClearance *
        Math.pow(operationResult.tensionTopOfPipe, 2) / (4 * EI);
        operationResult.trueTensionHelical = operationResult.normalForce + operationResult.sideForeceFromHelical;

        operationResult.axialLoadStrech = (operationResult.trueTensionHelical * operationResult.length) /
        (operationResult.crossSectionalArea * operationResult.youngsModulus)
        + (operationResult.trueTensionHelical * operationResult.length) /
        (2 * operationResult.crossSectionalArea * operationResult.youngsModulus);
        operationResult.balloningStrech = -2 * frictionFactor * operationResult.length *
        (operationResult.insidePipeHydrostaticChange * operationResult.pipeInnerArea
        - operationResult.annulusHydrostaticChange * operationResult.pipeOuterArea) /
        (operationResult.youngsModulus * (operationResult.pipeOuterArea -
        operationResult.pipeInnerArea));

        operationResult.bucklingStressInner = Stress.BucklingStress(operationResult.pipeInnerDiameter,
        operationResult.radialClearance, tensionTopOfPipe,
        operationResult.momentOfInertia);
        operationResult.bucklingStressOuter = Stress.BucklingStress(operationResult.pipeOuterDiameter,
        operationResult.radialClearance, tensionTopOfPipe,
        operationResult.momentOfInertia);

        operationResult.radialStressInner = Stress.RadialStress(operationResult.insidePipeHydrostaticPressure,
        operationResult.annulusHydrostaticPressure, AreaType.Inner);
        operationResult.radialStressOuter = Stress.RadialStress(operationResult.insidePipeHydrostaticPressure,
        operationResult.annulusHydrostaticPressure, AreaType.Outer);
        operationResult.hoopStressInner = Stress.HoopStress(operationResult.insidePipeHydrostaticPressure,
        operationResult.annulusHydrostaticPressure, operationResult.pipeInnerArea,
        operationResult.holeInnerArea, AreaType.Inner);
        operationResult.hoopStressOuter = Stress.HoopStress(operationResult.insidePipeHydrostaticPressure,
        operationResult.annulusHydrostaticPressure, operationResult.pipeInnerArea,
        operationResult.holeInnerArea, AreaType.Outer);
        operationResult.bendingStressInner = Stress.BendingStress(operationResult.youngsModulus,
        operationResult.pipeInnerDiameter, operationResult.dogLegSeverity);
        operationResult.bendingStressOuter = Stress.BendingStress(operationResult.youngsModulus,
        operationResult.pipeOuterDiameter, operationResult.dogLegSeverity);
        operationResult.axilStressInner = Stress.AxialStress(operationResult.tensionTopOfPipe, operationResult.pipeInnerArea,
        operationResult.bendingStressInner, operationResult.bucklingStressInner);
        operationResult.axilStressOuter = Stress.AxialStress(operationResult.tensionTopOfPipe, operationResult.holeInnerArea,
        operationResult.bendingStressOuter, operationResult.bucklingStressOuter);
        operationResult.vonMisesStressInner = Stress.VonMises(operationResult.axilStressInner,
        operationResult.hoopStressInner, operationResult.radialStressInner,
        operationResult.axilStressOuter, operationResult.hoopStressOuter, operationResult.radialStressOuter, AreaType.Inner);
        operationResult.vonMisesStressOuter = Stress.VonMises(operationResult.axilStressOuter,
        operationResult.hoopStressInner, operationResult.radialStressInner, operationResult.axilStressOuter,
        operationResult.hoopStressOuter, operationResult.radialStressOuter, AreaType.Outer);
        operationResult.torsionStressInner = Stress.TorsionalStress(operationResult.torqueBottom, operationResult.polarMomentOfInertia,
        operationResult.pipeInnerDiameter / 2.0);
        operationResult.torsionStressOuter = Stress.TorsionalStress(operationResult.torqueBottom, operationResult.polarMomentOfInertia,
        operationResult.pipeOuterDiameter / 2.0);

        if (2.8 * operationResult.tensionTopOfPipe > operationResult.criticalSinusoidalBuckling
        && operationResult.criticalSinusoidalBuckling > operationResult.tensionTopOfPipe)
        {
        operationResult.sinusoidalStrech = -(Math.pow(operationResult.radialClearance, 2)
        / (4 * EI * operationResult.buoyancyWeight * Math.cos(operationResult.averageInclination))) *
        (tensionTopOfPipe - operationResult.criticalSinusoidalBuckling) *
        (0.3771 * tensionTopOfPipe - 0.3668 * operationResult.criticalSinusoidalBuckling);
        }

        if (operationResult.criticalSinusoidalBuckling > 2.8 * tensionTopOfPipe)
        {
        operationResult.sinusoidalStrech = -(Math.pow(operationResult.radialClearance, 2)
        / (8 * EI * operationResult.buoyancyWeight * Math.cos(operationResult.averageInclination))) *
        (Math.pow(operationResult.tensionBottomOfPipe, 2) - Math.pow(tensionTopOfPipe, 2));
        }

        operationResult.bendingStressInner = operationResult.youngsModulus * (operationResult.pipeInnerDiameter / 2) *
        operationResult.dogLegSeverity / 68755;
        operationResult.bendingStressOuter = operationResult.youngsModulus * (operationResult.pipeOuterDiameter / 2) *
        operationResult.dogLegSeverity / 68755;
        operationResult.axilStressInner = (tensionTopOfPipe / operationResult.crossSectionalArea)
        + operationResult.bendingStressInner + operationResult.bucklingStressInner;
        operationResult.axilStressOuter = (tensionTopOfPipe / operationResult.crossSectionalArea)
        + operationResult.bendingStressOuter + operationResult.bucklingStressOuter;
        operationResult.transverseStressInner = 2 * operationResult.normalForce / operationResult.pipeInnerArea;
        operationResult.transverseStressOuter = 2 * operationResult.normalForce / operationResult.pipeOuterArea;
        operationResult.stressRatio = operationResult.yeildStrength * operationResult.percentOfYield
        / operationResult.axilStressOuter;
        const stress_tor:number = 0;
        operationResult.effectiveStressInner = (1 / Math.sqrt(2)) * Math.sqrt(2 * operationResult.axilStressInner + 6 * stress_tor);
        operationResult.effectiveStressOuter = (1 / Math.sqrt(2)) * Math.sqrt(2 * operationResult.axilStressOuter + 6 * stress_tor);
        const effectiveEnduranceLimit:number = 1;
        operationResult.fatiqueLimit = effectiveEnduranceLimit * (1 - tensionTopOfPipe / operationResult.tensileStrength);
        operationResult.fatiqueRatioInner = Math.abs(operationResult.bendingStressInner) + Math.abs(operationResult.bucklingStressInner) /
        operationResult.fatiqueLimit;
        operationResult.fatiqueRatioOuter = Math.abs(operationResult.bendingStressOuter) + Math.abs(operationResult.bucklingStressOuter) /
        operationResult.fatiqueLimit;

        operationResult.torqueTop = operationResult.torqueBottom + operationResult.torqueChange;

        operationResult.isSinusoidalBuckling = false;

        if (operationResult.tensionTopOfPipe < -operationResult.criticalSinusoidalBuckling)
        operationResult.isSinusoidalBuckling = true;

        operationResult.isHelicalBuckling = false;

        if (operationResult.tensionTopOfPipe < -operationResult.criticalHelicalBuckling)
        operationResult.isHelicalBuckling = true;

        operationResult.effectiveTension = operationResult.tensionTopOfPipe;

        operationResult.FormatResult();
        operationResults.push(operationResult);
    }

    const blockWeight:number = common.blockWeight * M;
    let dHKL:number = 0, HKL:number = 0;
    const ncount:number = operationResults.length;

    for (ii = ncount - 1; ii >= 0; ii--)
    {
    dHKL = (operationResults[ii].buoyancyWeight * Math.abs(Math.cos(operationResults[ii].averageInclination)) - Fds[ii]);
    HKL = HKL + dHKL;
    operationResults[ii].HookeLoadAtJoint = HKL + blockWeight;
    operationResults[ii].HookeLoadAtJointTop = operationResults[ii].HookeLoadAtJoint;
    operationResults[ii].overPullMargin = weakeastTensileStrenth - dHKL;


    }

    return operationResults;
    }

}