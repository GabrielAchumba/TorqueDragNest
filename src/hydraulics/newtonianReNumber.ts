export const NewtonianReNumber = {
    pipeFlow(mudWeight:number, fluidVelocity:number,
                        fluidViscosity:number, innerDiameter:number):number{
        const ReNumberPipe:number = 928 * innerDiameter * mudWeight * fluidVelocity / fluidViscosity;
        return ReNumberPipe;
    },

    AnnularFlow(mudWeight:number, fluidVelocity:number,
                        fluidViscosity:number, holeInnerDiameter:number,
                        pipeOuterDiameter:number):number{
        const ReNumberPipe:number = 757 * (holeInnerDiameter - pipeOuterDiameter) * mudWeight * fluidVelocity / fluidViscosity;
        return ReNumberPipe;
    }
}