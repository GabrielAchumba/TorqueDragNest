export class BinghamVelocity
{
    public static  DrillPipeFluidVelocotiy(flowRate:number, innerDiameter:number):number
    {
        let Vp:number = 0;
        Vp = flowRate / (2.448 * Math.pow(innerDiameter, 2));
        return Vp;
    }

    public static AnnuluFluidVelocity(flowRate:number, holeInnerDiameter:number, pipeOuterDiameter:number):number
    {
        let Vp:number = 0;
        Vp = flowRate / (2.448 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 2));
        return Vp;
    }

    public static pipeCrticalFluidVelocity(plasticViscosity:number, mudDensity:number,
                    pipeInnerDiameter:number, yeildPoint:number):number
    {
        const vCritical:number = (1.08 * plasticViscosity + 1.08 * Math.sqrt(Math.pow(plasticViscosity, 2) +
                12.34 * mudDensity * Math.pow(pipeInnerDiameter, 2) * yeildPoint)) / (mudDensity * pipeInnerDiameter);
        return vCritical;
    }

    public static annularCrticalFluidVelocity(plasticViscosity:number, mudDensity:number,
                    pipeOuterDiameter:number, holeInnerDiameter:number, yeildPoint:number):number
    {
        const annularSpace:number = holeInnerDiameter - pipeOuterDiameter;
        const vCritical:number = (1.08 * plasticViscosity + 1.08 * Math.sqrt(Math.pow(plasticViscosity, 2) +
                12.34 * mudDensity * Math.pow(annularSpace, 2) * yeildPoint)) / (mudDensity * annularSpace);
        return vCritical;
    }

    public static pipeCriticalFlowRate(pipeInnerDiameter:number, criticalVelocity:number):number
    {
        const Qcp = 2.448 * Math.pow(pipeInnerDiameter, 2) * criticalVelocity;
        return Qcp;
    }

    public static annularCriticalFlowRate(pipeOuterDiameter:number, holeInnerDiameter:number,
         criticalVelocity:number):number
    {
        const Qcp:number = 2.448 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 2) * criticalVelocity;
        return Qcp;
    }
}