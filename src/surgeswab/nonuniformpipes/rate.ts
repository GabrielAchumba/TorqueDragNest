export const Rate = {
    flowRateBitOpenEnded(pipeVelocity:number, drillBitArea:number,
                    adjacentPipeDiameter:number):number{
        const qt:number = pipeVelocity * ((Math.PI / 4) * Math.pow(adjacentPipeDiameter, 2) - drillBitArea)/ 144;
        return qt;
    },

    flowRatePipeOpenEnded(pipeVelocity:number, currentInsidePipeArea:number,
                    adjacentInsidePipeArea:number, adjacentFlowRate:number):number{
        const qt:number = adjacentFlowRate - pipeVelocity * (currentInsidePipeArea - adjacentInsidePipeArea) / 144;
        return qt;
    },

    flowRateOutsidePipeOpenEnded(pipeVelocity:number, currentInsidePipeArea:number,
                    adjacentInsidePipeArea:number, adjacentFlowRate:number):number{
        const qt:number = adjacentFlowRate - pipeVelocity * (adjacentInsidePipeArea - currentInsidePipeArea) / 144;
        return qt;
    },
    AreaDrillBit(bitArea:number):number{
        const Ab:number = bitArea / 144;
        return Ab;
    },

    PipeInnerArea(pipeInnerDiameter:number):number{
        const Ap:number = Math.PI * Math.pow(pipeInnerDiameter, 2) / 144;
        return Ap;
    },

    VelocityInsidePipe(flowRate:number, InnerArea:number):number{
        const Vi:number = (flowRate / InnerArea) * 144;
        return Vi;
    },

    EffectiveVelocityInsidePipe(pipeVelocity:number,
                    velocityInsidePipe:number):number{
        const Vie:number = velocityInsidePipe + pipeVelocity;
        return Vie;
    },

    flowRateAnnulusOpenEnded(pipeVelocity:number, currentPipeDiameter:number,
                    adjacentPipeDiameter:number, flowRateadjacentPipe:number):number {
        const qt:number = flowRateadjacentPipe  - pipeVelocity * (Math.PI / 4) *
            (Math.pow(adjacentPipeDiameter, 2) - Math.pow(currentPipeDiameter, 2)) * 1 / 144;
        return qt;
    },

    AnnulusArea(pipeOuterDiameter:number, annulusInnerDiameter:number):number{
        const Ap:number = Math.PI * (Math.pow(annulusInnerDiameter, 2) - Math.pow(pipeOuterDiameter, 2)) / 144;
        return Ap;
    },

    VelocityInsideAnnulus(annulusflowRate:number, annulusArea:number):number{
        const Vi:number = (annulusflowRate / annulusArea) * 144;
        return Vi;
    },

    EffectiveVelocityInsideAnnulus(pipeVelocity:number,
                    velocityInsideAnnulus:number, clingingConstant:number):number{
        const Vie:number = velocityInsideAnnulus;// + clingingConstant * pipeVelocity;
        return Vie;
    },

    ClingingConstantLaminar(holeInnerDiameter:number, pipeOuterDiameter:number):number{
        const alpha:number = pipeOuterDiameter / holeInnerDiameter;
        const Kc:number = (Math.pow(alpha, 2) - (2 * Math.pow(alpha, 2) * Math.log(alpha)) - 1) /
            (2 * (1 - Math.pow(alpha, 2)) * Math.log(alpha));
        return Kc;
    },

    ClingingConstantTurbulent(holeInnerDiameter:number, pipeOuterDiameter:number):number{
        const alpha:number = pipeOuterDiameter / holeInnerDiameter;
        const Kc:number = (((Math.pow(alpha, 4) + alpha) / (1 + alpha)) - Math.pow(alpha, 2)) /
                    (1 - Math.pow(alpha, 2));
        return Kc;
    }


}