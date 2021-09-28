export class Rate
{
    public static flowRateBitOpenEnded(pipeVelocity:number, drillBitArea:number,
                    adjacentPipeDiameter:number):number
    {
        const qt:number = pipeVelocity * ((Math.PI / 4) * Math.pow(adjacentPipeDiameter, 2) - drillBitArea)/ 144;
        return qt;
    }

    public static flowRatePipeOpenEnded(pipeVelocity:number, currentInsidePipeArea:number,
                    adjacentInsidePipeArea:number, adjacentFlowRate:number):number
    {
        const qt:number = adjacentFlowRate - pipeVelocity * (currentInsidePipeArea - adjacentInsidePipeArea) / 144;
        return qt;
    }

    public static flowRateOutsidePipeOpenEnded(pipeVelocity:number, currentInsidePipeArea:number,
                    adjacentInsidePipeArea:number, adjacentFlowRate:number):number
    {
        const qt:number = adjacentFlowRate - pipeVelocity * (adjacentInsidePipeArea - currentInsidePipeArea) / 144;
        return qt;
    }
    public static AreaDrillBit(bitArea:number):number
    {
        const Ab:number = bitArea / 144;
        return Ab;
    }

    public static PipeInnerArea(pipeInnerDiameter:number):number
    {
        const Ap:number = Math.PI * Math.pow(pipeInnerDiameter, 2) / 144;
        return Ap;
    }

    public static VelocityInsidePipe(flowRate:number, InnerArea:number):number
    {
        const Vi:number = (flowRate / InnerArea) * 144;
        return Vi;
    }

    public static EffectiveVelocityInsidePipe(pipeVelocity:number,
                    velocityInsidePipe:number):number
    {
        const Vie:number = velocityInsidePipe + pipeVelocity;
        return Vie;
    }

    public static flowRateAnnulusOpenEnded(pipeVelocity:number, currentPipeDiameter:number,
                    adjacentPipeDiameter:number, flowRateadjacentPipe:number):number
    {
        const qt:number = flowRateadjacentPipe  - pipeVelocity * (Math.PI / 4) *
            (Math.pow(adjacentPipeDiameter, 2) - Math.pow(currentPipeDiameter, 2)) * 1 / 144;
        return qt;
    }

    public static AnnulusArea(pipeOuterDiameter:number, annulusInnerDiameter:number):number
    {
        const Ap:number = Math.PI * (Math.pow(annulusInnerDiameter, 2) - Math.pow(pipeOuterDiameter, 2)) / 144;
        return Ap;
    }

    public static VelocityInsideAnnulus(annulusflowRate:number, annulusArea:number):number
    {
        const Vi:number = (annulusflowRate / annulusArea) * 144;
        return Vi;
    }

    public static EffectiveVelocityInsideAnnulus(pipeVelocity:number,
                    velocityInsideAnnulus:number, clingingConstant:number):number
    {
        const Vie:number = velocityInsideAnnulus;// + clingingConstant * pipeVelocity;
        return Vie;
    }

    public static ClingingConstantLaminar(holeInnerDiameter:number, pipeOuterDiameter:number):number
    {
        const alpha:number = pipeOuterDiameter / holeInnerDiameter;
        const Kc:number = (Math.pow(alpha, 2) - (2 * Math.pow(alpha, 2) * Math.log(alpha)) - 1) /
            (2 * (1 - Math.pow(alpha, 2)) * Math.log(alpha));
        return Kc;
    }

    public static ClingingConstantTurbulent(holeInnerDiameter:number, pipeOuterDiameter:number):number
    {
        const alpha:number = pipeOuterDiameter / holeInnerDiameter;
        const Kc:number = (((Math.pow(alpha, 4) + alpha) / (1 + alpha)) - Math.pow(alpha, 2)) /
                    (1 - Math.pow(alpha, 2));
        return Kc;
    }


}