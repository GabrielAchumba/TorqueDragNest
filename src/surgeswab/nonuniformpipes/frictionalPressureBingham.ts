export class FrictionalPressureBingham
{
    public static PressureLaminarDrillBit(mudDensity:number, effectiveVelocity:number):number
    {
        const deltaP:number = mudDensity * Math.pow(effectiveVelocity, 2) / 1120;
        return deltaP;
    }

    public static PressureLaminarInsidePipe(plasticViscosity:number, effectiveVelocity:number,
                        pipeInnerDiameter:number,  pipeLength:number,  yieldPoint:number):number
    {
        const deltaP:number = ((plasticViscosity * effectiveVelocity
            / (1500 * Math.pow(pipeInnerDiameter, 2)))
            + (yieldPoint
            / (225 * pipeInnerDiameter)))* pipeLength;
        return deltaP;
    }

    public static PressureLaminarInsideAnnulus(plasticViscosity:number, effectiveVelocity:number,
                        pipeOuterDiameter:number, annulusInnerDiameter:number, pipeLength:number,
                        yieldPoint:number):number
    {
        const deltaP:number = ((plasticViscosity * effectiveVelocity
            / (1000 * Math.pow(annulusInnerDiameter - pipeOuterDiameter, 2)))
            + (yieldPoint
            / (200 * (annulusInnerDiameter- pipeOuterDiameter)))) * pipeLength;
        return deltaP;
    }


    public static PressureTurbulentInsidePipe(frictionalFactor:number, mudDensity:number,
         effectiveVelocity:number, pipeInnerDiameter:number, pipeLength:number)
    {
        const deltaP:number = ((frictionalFactor * mudDensity * Math.pow(effectiveVelocity,2))
            / (25.8 * pipeInnerDiameter)) * pipeLength;
        return deltaP;
    }

    public static PressureTurbulentInsideAnnulus(frictionalFactor:number, mudDensity:number,
         effectiveVelocity:number, pipeOuterDiameter:number, annulusInnerDiameter:number,
        pipeLength:number)
    {
        const deltaP = (frictionalFactor * mudDensity * Math.pow(effectiveVelocity, 2)
            / (21.1 * (annulusInnerDiameter - pipeOuterDiameter))) * pipeLength;
        return deltaP;
    }
}