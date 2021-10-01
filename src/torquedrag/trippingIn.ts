import { Pipe } from "src/models/basepipe";
import { Common } from "src/models/common";
import { AreaType } from "src/models/enums";
import { MudPVTModel } from "src/models/mudpvt";
import { Operation } from "src/models/operation";
import { BaseOperationResult, OperationResult } from "src/models/operationResult";
import { Drag } from "./drillingengineering/drag";
import { Stress } from "./drillingengineering/stress";
import { Torque } from "./drillingengineering/torque";

export class TrippingIn {

    public static RunTrippingInOpertion(pipes:Pipe[], operation:Operation,
        mudPVTs:MudPVTModel[], common:Common,
    baseOperationResults:BaseOperationResult[], weakeastTensileStrenth:number,
    casingFF:number = null, openHoleFF:number = null):OperationResult[]
    {
        let operationResults:OperationResult[] = [];
        let ii:number = -1;
        let HKL:number = 0;

        const pipesLength:number = pipes.length;
        for (ii = 0; ii < pipesLength; ii++)
        {
            const pipe:Pipe = pipes[ii];
            const operationResult:OperationResult = new OperationResult();
            operationResults.push(operationResult);
        }

        let Fds:number[] = [];

        const ncount:number = operationResults.length;
        const plasticViscosity:number = mudPVTs[0].plasticViscoity;
        let frictionFactor:number = 0;
        const angleConverter:number = Math.PI / 180.0;

        for (ii = 0; ii < ncount; ii++)
        {

            let baseOperationResult:BaseOperationResult = baseOperationResults[ii];
            operationResults[ii].length = baseOperationResult.length;
            operationResults[ii].pipeInnerDiameter = baseOperationResult.pipeInnerDiameter;
            operationResults[ii].pipeOuterDiameter = baseOperationResult.pipeOuterDiameter;
            operationResults[ii].pipeOuterArea = baseOperationResult.pipeOuterArea;
            operationResults[ii].pipeOuterArea = baseOperationResult.pipeOuterArea;
            operationResults[ii].crossSectionalArea = baseOperationResult.crossSectionalArea;
            operationResults[ii].typeOfSection = baseOperationResult.typeOfSection;
            operationResults[ii].pipeOuterArea = baseOperationResult.pipeOuterArea;
            operationResults[ii].pipeInnerArea = baseOperationResult.pipeInnerArea;
            operationResults[ii].pipeUnitWeight = baseOperationResult.pipeUnitWeight;
            operationResults[ii].pipeTotalWeight = baseOperationResult.pipeTotalWeight;
            operationResults[ii].buoyancyFactor = baseOperationResult.buoyancyFactor;
            operationResults[ii].buoyancyWeight = baseOperationResult.buoyancyWeight;
            operationResults[ii].yeildStrength = baseOperationResult.yeildStrength;
            operationResults[ii].tensileStrength = baseOperationResult.tensileStrength;
            operationResults[ii].topMeasuredDepth = baseOperationResult.topMeasuredDepth;
            operationResults[ii].bottomMeasuredDepth = baseOperationResult.bottomMeasuredDepth;
            operationResults[ii].changeInInclination = baseOperationResult.changeInInclination * angleConverter;
            operationResults[ii].changeInAzimuth = baseOperationResult.changeInAzimuth * angleConverter;
            operationResults[ii].topInclination = baseOperationResult.topInclination * angleConverter;
            operationResults[ii].bottomInclination = baseOperationResult.bottomInclination * angleConverter;
            operationResults[ii].topAzimuth = baseOperationResult.topAzimuth * angleConverter;
            operationResults[ii].bottomAzimuth = baseOperationResult.bottomAzimuth * angleConverter;
            operationResults[ii].dogLegSeverity = baseOperationResult.dogLegSeverity;
            operationResults[ii].holeSection = baseOperationResult.holeSection;
            operationResults[ii].radialClearance = baseOperationResult.radialClearance/12.0;
            operationResults[ii].momentOfInertia = baseOperationResult.momentOfInertia;
            operationResults[ii].polarMomentOfInertia = baseOperationResult.polarMomentOfInertia;
            operationResults[ii].criticalInclinationAngle = baseOperationResult.criticalInclinationAngle;
            operationResults[ii].criticalSinusoidalBuckling = baseOperationResult.criticalSinusoidalBuckling;
            operationResults[ii].criticalHelicalBuckling = baseOperationResult.criticalHelicalBuckling;
            operationResults[ii].criticalHelicalBuckling = baseOperationResult.criticalHelicalBuckling;
            operationResults[ii].annulusHydrostaticPressureTop = baseOperationResult.annulusHydrostaticPressureTop;
            operationResults[ii].insidePipeHydrostaticPressureTop = baseOperationResult.insidePipeHydrostaticPressureTop;
            operationResults[ii].annulusHydrostaticPressure = baseOperationResult.annulusHydrostaticPressure;
            operationResults[ii].insidePipeHydrostaticPressure = baseOperationResult.insidePipeHydrostaticPressure;
            operationResults[ii].insidePipeHydrostaticChange = baseOperationResult.insidePipeHydrostaticChange;
            operationResults[ii].annulusHydrostaticChange = baseOperationResult.annulusHydrostaticChange;
            operationResults[ii].percentOfYield = baseOperationResult.percentOfYield;
            operationResults[ii].youngsModulus = baseOperationResult.youngsModulus;
            operationResults[ii].section2D = baseOperationResult.section2D;
            operationResults[ii].mudDensityInsidePipe = baseOperationResult.mudDensityInsidePipe;
            operationResults[ii].mudDensityAnnulus = baseOperationResult.mudDensityAnnulus;
            operationResults[ii].annulusHydrostaticPressure = baseOperationResult.annulusHydrostaticPressure;
            operationResults[ii].insidePipeHydrostaticPressure = baseOperationResult.insidePipeHydrostaticPressure;
            operationResults[ii].annulusBottomPressureForce = baseOperationResult.annulusBottomPressureForce;
            operationResults[ii].pipeBottomPressureForce = baseOperationResult.pipeBottomPressureForce;
            operationResults[ii].pressureLoss = baseOperationResult.pressureLoss;
            operationResults[ii].fluidDragForce = baseOperationResult.fluidDragForce;
            operationResults[ii].bucklingStabilityForce = baseOperationResult.bucklingStabilityForce;
            operationResults[ii].averageInclination = baseOperationResult.averageInclination;
            operationResults[ii].holeInnerArea = baseOperationResult.holeInnerArea;


            frictionFactor = operationResults[ii].holeSection.frictionFactor;

            if (operationResults[ii].holeSection.typeOfHole.toLowerCase() == "open hole")
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
                operationResults[ii].tensionBottomOfPipe = 0;
                operationResults[ii].torqueBottom = 0;

            }
            else
            {
                operationResults[ii].tensionBottomOfPipe = operationResults[ii - 1].tensionTopOfPipe;
                operationResults[ii].torqueBottom = operationResults[ii - 1].torqueTop;
            }

            if (ii == 0) operationResults[ii].ChangeIntension = operationResults[ii].tensionBottomOfPipe;
            else operationResults[ii].ChangeIntension = operationResults[ii - 1].ChangeIntension;


            operationResults[ii].normalForce = Drag.NormalForce(operationResults[ii].tensionBottomOfPipe, operationResults[ii].averageInclination,
            operationResults[ii].changeInAzimuth, operationResults[ii].buoyancyWeight,
            operationResults[ii].changeInInclination);


            operationResults[ii].ChangeIntension = operationResults[ii].buoyancyWeight *
            Math.cos(operationResults[ii].averageInclination)
            - frictionFactor * operationResults[ii].normalForce;
            //operationResults[ii].bucklingStabilityForce;




            operationResults[ii].tensionTopOfPipe = operationResults[ii].tensionBottomOfPipe + operationResults[ii].ChangeIntension;

            //-------------------Recently Added ------------------------------------//

            //double dragF = Drag.DragForce(operationResults[ii].normalForce,
            //            frictionFactor,
            //            operation.trippingInSpeed, operation.trippingInRPM, operationResults[ii].pipeOuterDiameter, 0);// + baseOperationResult.fluidDragForce;

            //Fds.Add(dragF);


            //if (ii == 0) operationResults[ii].totalDrag = dragF;
            //else operationResults[ii].totalDrag = operationResults[ii - 1].totalDrag + dragF;


            operationResults[ii].HookeLoadAtJoint = HKL;



            const dh2:number = Math.pow(baseOperationResult.holeSection.innerDiameter, 2);
            const dbo2:number = Math.pow(baseOperationResult.pipeOuterArea, 2);

            operationResults[ii].shearRateInAnnulus = (4 * Math.PI * operation.trippingInRPM / 60) /
            (dbo2 * ((1 / dbo2) - (1 / dh2)));
            const initialShearStress:number = 0;
            operationResults[ii].shearStress = Stress.ShearStress(initialShearStress, plasticViscosity, operationResults[ii].shearRateInAnnulus);

            operationResults[ii].torqueFromShearStress = operationResults[ii].shearStress * 2 * Math.PI
            * operationResults[ii].length * Math.pow(operationResults[ii].pipeOuterDiameter, 2) / 24;
            operationResults[ii].torqueChange = Torque.TorqueIncrement(operationResults[ii].normalForce,
            frictionFactor, operationResults[ii].pipeOuterDiameter / 2.0,
            operation.trippingInSpeed, operation.trippingInRPM, 0);// + operationResults[ii].torqueFromShearStress;
            operationResults[ii].torqueAngle = (frictionFactor / (1 + Math.pow(frictionFactor, 2))) * operationResults[ii].torqueChange;

            const tensionTopOfPipe:number = Math.abs(operationResults[ii].tensionTopOfPipe);
            const diffTensionBuckling:number = Math.abs(tensionTopOfPipe - operationResults[ii].criticalSinusoidalBuckling);

            operationResults[ii].pipeRotationAngle = Math.atan((tensionTopOfPipe * operationResults[ii].changeInAzimuth *
            Math.sin(operationResults[ii].averageInclination)) /
            tensionTopOfPipe * operationResults[ii].changeInInclination
            + operationResults[ii].buoyancyWeight * Math.sin(operationResults[ii].averageInclination))
            + Math.atan(frictionFactor);
            operationResults[ii].maxAxialStress = operationResults[ii].buoyancyWeight
            / (operationResults[ii].pipeOuterArea - operationResults[ii].pipeInnerArea);
            operationResults[ii].maxBendingStress = 20000 * (1 - (operationResults[ii].maxAxialStress / 145000));
            const EI:number = operationResults[ii].youngsModulus * operationResults[ii].momentOfInertia;
            const k:number= Math.sqrt(tensionTopOfPipe / (EI));
            const L:number = 180;//inches
            operationResults[ii].maxDoglegSeverity = (432000 * operationResults[ii].maxBendingStress / (Math.PI * operationResults[ii].youngsModulus
            * operationResults[ii].pipeOuterDiameter)) * Math.atan(k * L) / (k * L);
            operationResults[ii].angleSinusoidalBuckling = 1.1227 / (Math.sqrt(2 * EI)) * Math.pow(tensionTopOfPipe, 0.04) *
            Math.pow(diffTensionBuckling, 0.46);
            operationResults[ii].angleHelicalBuckling = Math.sqrt(Math.abs(tensionTopOfPipe) / (2 * EI));
            operationResults[ii].pitchHelical = (2 * Math.PI) / operationResults[ii].angleHelicalBuckling;
            operationResults[ii].dogLegFromHelical = 68755 * operationResults[ii].radialClearance * Math.pow(operationResults[ii].angleHelicalBuckling, 2);
            const beta:number = Math.sqrt(tensionTopOfPipe / (2 * EI));
            const term1:number = Math.pow(operationResults[ii].radialClearance, 2);
            const term2:number = (1 - term1) * Math.pow(beta, 2);
            const term3:number = (2 * Math.sqrt(term2));
            operationResults[ii].torequeFromHelical = 0;// tensionTopOfPipe * Math.Pow(operationResults[ii].radialClearance, 2) * beta / term3;
            operationResults[ii].shearStressFromHelical = 0;// tensionTopOfPipe * operationResults[ii].radialClearance * beta / term3;

            operationResults[ii].strainSinusoidal = -0.7285 * Math.pow(operationResults[ii].radialClearance, 2) *
            Math.pow(tensionTopOfPipe, 0.08) *
            Math.pow(diffTensionBuckling, 0.92);

            operationResults[ii].strainHelical = Math.pow(operationResults[ii].radialClearance, 2) * tensionTopOfPipe / (4 * EI);
            operationResults[ii].sideForeceFromHelical = operationResults[ii].radialClearance *
            Math.pow(operationResults[ii].tensionTopOfPipe, 2) / (4 * EI);
            operationResults[ii].trueTensionHelical = operationResults[ii].normalForce + operationResults[ii].sideForeceFromHelical;

            operationResults[ii].axialLoadStrech = (operationResults[ii].trueTensionHelical * operationResults[ii].length) /
            (operationResults[ii].crossSectionalArea * operationResults[ii].youngsModulus)
            + (operationResults[ii].trueTensionHelical * operationResults[ii].length) /
            (2 * operationResults[ii].crossSectionalArea * operationResults[ii].youngsModulus);
            operationResults[ii].balloningStrech = -2 * frictionFactor * operationResults[ii].length *
            (operationResults[ii].insidePipeHydrostaticChange * operationResults[ii].pipeInnerArea
            - operationResults[ii].annulusHydrostaticChange * operationResults[ii].pipeOuterArea) /
            (operationResults[ii].youngsModulus * (operationResults[ii].pipeOuterArea -
            operationResults[ii].pipeInnerArea));


            operationResults[ii].bucklingStressInner = Stress.BucklingStress(operationResults[ii].pipeInnerDiameter,
            operationResults[ii].radialClearance, tensionTopOfPipe,
            operationResults[ii].momentOfInertia);
            operationResults[ii].bucklingStressOuter = Stress.BucklingStress(operationResults[ii].pipeOuterDiameter,
            operationResults[ii].radialClearance, tensionTopOfPipe,
            operationResults[ii].momentOfInertia);

            operationResults[ii].radialStressInner = Stress.RadialStress(operationResults[ii].insidePipeHydrostaticPressure,
            operationResults[ii].annulusHydrostaticPressure, AreaType.Inner);
            operationResults[ii].radialStressOuter = Stress.RadialStress(operationResults[ii].insidePipeHydrostaticPressure,
            operationResults[ii].annulusHydrostaticPressure, AreaType.Outer);
            operationResults[ii].hoopStressInner = Stress.HoopStress(operationResults[ii].insidePipeHydrostaticPressure,
            operationResults[ii].annulusHydrostaticPressure, operationResults[ii].pipeInnerArea,
            operationResults[ii].holeInnerArea, AreaType.Inner);
            operationResults[ii].hoopStressOuter = Stress.HoopStress(operationResults[ii].insidePipeHydrostaticPressure,
            operationResults[ii].annulusHydrostaticPressure, operationResults[ii].pipeInnerArea,
            operationResults[ii].holeInnerArea, AreaType.Outer);
            operationResults[ii].bendingStressInner = Stress.BendingStress(operationResults[ii].youngsModulus,
            operationResults[ii].pipeInnerDiameter, operationResults[ii].dogLegSeverity);
            operationResults[ii].bendingStressOuter = Stress.BendingStress(operationResults[ii].youngsModulus,
            operationResults[ii].pipeOuterDiameter, operationResults[ii].dogLegSeverity);
            operationResults[ii].axilStressInner = Stress.AxialStress(operationResults[ii].tensionTopOfPipe, operationResults[ii].pipeInnerArea,
            operationResults[ii].bendingStressInner, operationResults[ii].bucklingStressInner);
            operationResults[ii].axilStressOuter = Stress.AxialStress(operationResults[ii].tensionTopOfPipe, operationResults[ii].holeInnerArea,
            operationResults[ii].bendingStressOuter, operationResults[ii].bucklingStressOuter);
            operationResults[ii].vonMisesStressInner = Stress.VonMises(operationResults[ii].axilStressInner, 
            operationResults[ii].hoopStressInner, operationResults[ii].radialStressInner,
            operationResults[ii].axilStressOuter, operationResults[ii].hoopStressOuter, operationResults[ii].radialStressOuter, AreaType.Inner);
            operationResults[ii].vonMisesStressOuter = Stress.VonMises(operationResults[ii].axilStressOuter, 
            operationResults[ii].hoopStressInner, operationResults[ii].radialStressInner, operationResults[ii].axilStressOuter,
            operationResults[ii].hoopStressOuter, operationResults[ii].radialStressOuter, AreaType.Outer);
            operationResults[ii].torsionStressInner = Stress.TorsionalStress(operationResults[ii].torqueBottom, operationResults[ii].polarMomentOfInertia,
            operationResults[ii].pipeInnerDiameter / 2.0);
            operationResults[ii].torsionStressOuter = Stress.TorsionalStress(operationResults[ii].torqueBottom, operationResults[ii].polarMomentOfInertia,
            operationResults[ii].pipeOuterDiameter / 2.0);
            if (2.8 * operationResults[ii].tensionTopOfPipe > operationResults[ii].criticalSinusoidalBuckling
            && operationResults[ii].criticalSinusoidalBuckling > operationResults[ii].tensionTopOfPipe)
            {
            operationResults[ii].sinusoidalStrech = -(Math.pow(operationResults[ii].radialClearance, 2)
            / (4 * EI * operationResults[ii].buoyancyWeight * Math.cos(operationResults[ii].averageInclination))) *
            (tensionTopOfPipe - operationResults[ii].criticalSinusoidalBuckling) *
            (0.3771 * tensionTopOfPipe - 0.3668 * operationResults[ii].criticalSinusoidalBuckling);
            }

            if (operationResults[ii].criticalSinusoidalBuckling > 2.8 * tensionTopOfPipe)
            {
            operationResults[ii].sinusoidalStrech = -(Math.pow(operationResults[ii].radialClearance, 2)
            / (8 * EI * operationResults[ii].buoyancyWeight * Math.cos(operationResults[ii].averageInclination))) *
            (Math.pow(operationResults[ii].tensionBottomOfPipe, 2) - Math.pow(tensionTopOfPipe, 2));
            }


            operationResults[ii].transverseStressInner = 2 * operationResults[ii].normalForce / operationResults[ii].pipeInnerArea;
            operationResults[ii].transverseStressOuter = 2 * operationResults[ii].normalForce / operationResults[ii].pipeOuterArea;
            operationResults[ii].stressRatio = operationResults[ii].yeildStrength * operationResults[ii].percentOfYield
            / operationResults[ii].axilStressOuter;
            const stress_tor:number = 0;
            operationResults[ii].effectiveStressInner = (1 / Math.sqrt(2)) * Math.sqrt(2 * operationResults[ii].axilStressInner + 6 * stress_tor);
            operationResults[ii].effectiveStressOuter = (1 / Math.sqrt(2)) * Math.sqrt(2 * operationResults[ii].axilStressOuter + 6 * stress_tor);
            const effectiveEnduranceLimit:number = 1;
            operationResults[ii].fatiqueLimit = effectiveEnduranceLimit * (1 - tensionTopOfPipe / operationResults[ii].tensileStrength);
            operationResults[ii].fatiqueRatioInner = Math.abs(operationResults[ii].bendingStressInner) + Math.abs(operationResults[ii].bucklingStressInner) /
            operationResults[ii].fatiqueLimit;
            operationResults[ii].fatiqueRatioOuter = Math.abs(operationResults[ii].bendingStressOuter) + Math.abs(operationResults[ii].bucklingStressOuter) /
            operationResults[ii].fatiqueLimit;



            operationResults[ii].torqueTop = operationResults[ii].torqueBottom + operationResults[ii].torqueChange;

            //------------------------------------------------------------------------------------------------------------//


            operationResults[ii].isSinusoidalBuckling = false;

            if (operationResults[ii].tensionTopOfPipe < -operationResults[ii].criticalSinusoidalBuckling)
            operationResults[ii].isSinusoidalBuckling = true;

            operationResults[ii].isHelicalBuckling = false;

            if (operationResults[ii].tensionTopOfPipe < -operationResults[ii].criticalHelicalBuckling)
            operationResults[ii].isHelicalBuckling = true;
            operationResults[ii].effectiveTension = operationResults[ii].tensionTopOfPipe;

            operationResults[ii].FormatResult();

        }

        const M:number= 1000.0;
        const blockWeight:number = common.blockWeight * M;
        let dHKL:number = 0;
        let ij:number = -1;

        for (ii = ncount - 1; ii >= 0; ii--)
        {
            frictionFactor = operationResults[ii].holeSection.frictionFactor;

            if (operationResults[ii].holeSection.typeOfHole.toLowerCase() == "open hole")
            {
                if (openHoleFF != null)
                frictionFactor = openHoleFF;
            }
            else
            {
                if (casingFF != null)
                frictionFactor = casingFF;
                }

            const dragF:number = Drag.DragForce(operationResults[ii].normalForce,
            frictionFactor,
            operation.trippingInSpeed, operation.trippingInRPM, operationResults[ii].pipeOuterDiameter, 0);// + baseOperationResult.fluidDragForce;

            Fds.push(dragF);


            if (ii == ncount - 1) operationResults[ii].totalDrag = dragF;
            else operationResults[ii].totalDrag = operationResults[ii + 1].totalDrag + dragF;

            dHKL = Math.abs(operationResults[ii].buoyancyWeight * Math.cos(operationResults[ii].averageInclination)) - dragF; // Fds[ii];
            HKL = HKL + dHKL;
            operationResults[ii].HookeLoadAtJoint = HKL + blockWeight;
            operationResults[ii].HookeLoadAtJointTop = operationResults[ii].HookeLoadAtJoint;
            operationResults[ii].overPullMargin = weakeastTensileStrenth - dHKL;

        }



        return operationResults;

    }
}