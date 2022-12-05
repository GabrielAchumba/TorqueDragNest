export const FrictionalPressureHerschel = {
    PressureLaminarDrillBit(mudDensity:number, effectiveVelocity:number):number{
        const deltaP:number = mudDensity * Math.pow(effectiveVelocity, 2) / 1120;
        return deltaP;
    },

    PressureLaminarInsidePipe(consistencyIndex:number, flowBehaviourIndex:number,
                effectiveVelocity:number, pipeInnerDiameter:number, pipeLength:number):number {
        const deltaP:number = (consistencyIndex * Math.pow(effectiveVelocity, flowBehaviourIndex) * pipeLength
            / (144000 * Math.pow(pipeInnerDiameter, 1 + flowBehaviourIndex))) *
            Math.pow((3 + (1 / flowBehaviourIndex)) / 0.0416, flowBehaviourIndex);

        return deltaP;
    },

    PressureLaminarInsideAnnulus(consistencyIndex:number, flowBehaviourIndex:number,
                            effectiveVelocity:number, pipeOuterDiameter:number,
                            annulusInnerDiameter:number, pipeLength:number,
                            yieldPoint:number):number{
        const deltaP:number = (consistencyIndex * Math.pow(effectiveVelocity, flowBehaviourIndex) * pipeLength
            / (144000 * Math.pow(annulusInnerDiameter - pipeOuterDiameter, 1 + flowBehaviourIndex))) *
            Math.pow((2 + (1 / flowBehaviourIndex)) / 0.0208, flowBehaviourIndex);

        return deltaP;
    },


    PressureTurbulentInsidePipe(frictionalFactor:number, mudDensity:number,
         effectiveVelocity:number, pipeInnerDiameter:number, pipeLength:number):number{
        const deltaP:number = (frictionalFactor * mudDensity * effectiveVelocity
            / (25.8 * pipeInnerDiameter)) * pipeLength;
        return deltaP;
    },

    PressureTurbulentInsideAnnulus(frictionalFactor:number, mudDensity:number,
         effectiveVelocity:number, pipeOuterDiameter:number, annulusInnerDiameter:number,
          pipeLength:number):number
    {
        const deltaP:number = (frictionalFactor * mudDensity * effectiveVelocity
            / (21.1 * (annulusInnerDiameter - pipeOuterDiameter))) * pipeLength;
        return deltaP;
    }
}