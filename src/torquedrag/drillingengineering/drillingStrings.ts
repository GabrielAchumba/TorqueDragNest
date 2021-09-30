import { Constants } from "src/utilities/constants";

export class DrillingStrings
{
    public static PipeArea(diameter:number, jointDiameter:number = 0, isJoint:boolean = false):number
    {
        let pipeArea:number = 0;
        // outerDiameter (inches)
        // pipeArea (sqInches)
        if (isJoint == false)
        {
            pipeArea = Math.PI * Math.pow(diameter, 2.0) / 4.0;
        }
        else
        {
            pipeArea = Math.PI * (0.95 * Math.pow(diameter, 2.0)
                        + 0.05 * Math.pow(jointDiameter, 2.0)) / 4.0;
        }

        return pipeArea;

    }

    public static DrillPipeUnitWeight(outerDiameter:number, innerDiameter:number):number
    {

        //Where outerDiameter and InnerDiameter are in inches, and PipeUnitWeight is in Ibs/ft

        const pipeUnitWeight:number = 196.5 * Math.PI * (Math.pow(outerDiameter, 2.0) - Math.pow(innerDiameter, 2.0)) / 231.0;

        return pipeUnitWeight;

    }

    public static DrillPipeTotalWeight(pipeUnitWeight:number, pipeLength:number):number
    {
        // Where pipeLength is in feet and PipeTotalWeight is in Ibs

        const pipeTotalWeight:number = pipeUnitWeight * pipeLength;

        return pipeTotalWeight;
    }

    public static BuoyancyFactor(mudDensity:number):number
    {
        if ((mudDensity / Constants.densityOfSteel) > 1.0) return 1.0;

        const Beta = 1 - (mudDensity / Constants.densityOfSteel);
        return Beta;
    }

    public static BuoyancyWeightPerUnitLength(buoyancyFactor:number,
                    pipeUnitWeightInAir:number):number
    {

        const buoyancyWeightPerUnitLength:number = buoyancyFactor * pipeUnitWeightInAir;
        return buoyancyWeightPerUnitLength;
    }

    public static TotalBuoyancyWeight(buoyancyWeightPerUnitLength:number,
        pipeLength:number):number
    {
        const totalBuoyancyWeight:number = buoyancyWeightPerUnitLength * pipeLength;
        return totalBuoyancyWeight;
    }

    public static TensileStrength(outerDiameter:number, innerDiameter:number,
         minimumYieldStrength:number):number
    {
        const tensileStrength:number = ((Math.pow(outerDiameter, 2.0) - Math.pow(innerDiameter, 2.0)) * Math.PI / 4.0) * minimumYieldStrength;
        return tensileStrength;
    }

    public static GetLengthOfBHA(weightOnBit:number, drillCollarSafetyFactor:number,
        buoyancyFactor:number, weightOfDrillCollars:number):number
    {
        const L_BHA:number = (weightOnBit * (1 - drillCollarSafetyFactor)) /
            (weightOfDrillCollars + buoyancyFactor);
        return L_BHA;
    }

    public static GetBendingStressRatio(
        toolOutsideDiameter:number,
        boxThreadsRootDiameter:number,
        pinThreadsRootDiameter:number,
        pinInsideDiameter:number):number
    {
        const term1:number = Math.pow(toolOutsideDiameter, 4.0)
            - Math.pow(boxThreadsRootDiameter, 4.0);
        const term2:number = Math.pow(pinThreadsRootDiameter, 4.0)
            - Math.pow(pinInsideDiameter, 4.0);
        const bendingStressRatio:number = (term1 / toolOutsideDiameter) /
            (term2 / pinThreadsRootDiameter);
        return bendingStressRatio;
    }

    public static GetCorrectedOutSideDiameter(
        classMultiplier:number, pipeOuterDiameter:number,
        pipeInnerDiameter:number):number
    {
        const correctedOutSideDiameter:number = classMultiplier * pipeOuterDiameter
            + pipeInnerDiameter * (1 - classMultiplier);
        return correctedOutSideDiameter;
    }


}