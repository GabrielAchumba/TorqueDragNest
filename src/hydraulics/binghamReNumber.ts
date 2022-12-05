export const BinghamReNumber = {
    pipeFlow(mudWeight:number, fluidVelocity:number,
                        effectiveFluidViscosity:number, innerDiameter:number):number{
        const ReNumberPipe:number = 928 * innerDiameter * mudWeight * fluidVelocity / effectiveFluidViscosity;
        return ReNumberPipe;
    },

    AnnularFlow(mudWeight:number, fluidVelocity:number,
                        effectiveFluidViscosity:number, holeInnerDiameter:number,
                        pipeOuterDiameter:number):number{
        const ReNumberPipe:number = 757 * (holeInnerDiameter - pipeOuterDiameter) * mudWeight * fluidVelocity / effectiveFluidViscosity;
        return ReNumberPipe;
    }
}