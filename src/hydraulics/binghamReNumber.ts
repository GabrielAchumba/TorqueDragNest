export class BinghamReNumber
{
    public static pipeFlow(mudWeight:number, fluidVelocity:number,
                        effectiveFluidViscosity:number, innerDiameter:number):number
    {
        const ReNumberPipe:number = 928 * innerDiameter * mudWeight * fluidVelocity / effectiveFluidViscosity;
        return ReNumberPipe;
    }

    public static AnnularFlow(mudWeight:number, fluidVelocity:number,
                        effectiveFluidViscosity:number, holeInnerDiameter:number,
                        pipeOuterDiameter:number):number
    {
        const ReNumberPipe:number = 757 * (holeInnerDiameter - pipeOuterDiameter) * mudWeight * fluidVelocity / effectiveFluidViscosity;
        return ReNumberPipe;
    }
}