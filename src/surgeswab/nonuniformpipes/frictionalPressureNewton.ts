export const FrictionalPressureNewton = {
    PressureLaminarDrillBit(mudDensity:number, effectiveVelocity:number):number{
        const deltaP:number = mudDensity * Math.pow(effectiveVelocity, 2) / 1120;
        return deltaP;
    },

    PressureLaminarInsidePipe(newtonianViscosity:number, effectiveVelocity:number,
                        pipeInnerDiameter:number,  pipeLength:number):number{
        const deltaP:number = (newtonianViscosity * effectiveVelocity
            / (1500 * Math.pow(pipeInnerDiameter, 2))) * pipeLength;
        return deltaP;
    },

    PressureLaminarInsideAnnulus(newtonianViscosity:number, effectiveVelocity:number,
                pipeOuterDiameter:number, annulusInnerDiameter:number, pipeLength:number):number{
        const deltaP:number = (newtonianViscosity * effectiveVelocity
            / (1000 * Math.pow(annulusInnerDiameter - pipeOuterDiameter, 2))) * pipeLength;
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
        pipeLength:number):number{
        const deltaP:number = (frictionalFactor * mudDensity * effectiveVelocity
            / (21.1 * (annulusInnerDiameter - pipeOuterDiameter))) * pipeLength;
        return deltaP;
    }
}