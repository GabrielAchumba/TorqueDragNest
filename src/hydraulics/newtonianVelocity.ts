export const NewtonianVelocity = {
    NewtonianViscosity(dialReading:number,
        RPM:number):number{
        const muN:number = 3000 * dialReading / RPM;
        return muN;
    },

    DrillPipeFluidVelocotiy(flowRate:number, innerDiameter:number):number{
        const Vp:number = flowRate / (2.448 * Math.pow(innerDiameter, 2));
        return Vp;
    },

    AnnuluFluidVelocity(flowRate:number, holeInnerDiameter:number,
         pipeOuterDiameter:number){
        const Vp:number = flowRate / (2.448 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 2));
        return Vp;
    }
}