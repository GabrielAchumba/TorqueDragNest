export class BinghamPressureLoss
{
    public static shearStress(yeildPoint:number, plasticViscosity:number, shearRate:number):number
    {
        //Note lb.Sec/ft2 = 47900cp
        const tau:number = yeildPoint + plasticViscosity * shearRate;
        return tau;
    }
    public static PipeLaminarFlow(fluidViscosity:number,
                            fluidVelocity:number, pipeLength:number,
                            pipeInnerDiameter:number, yeildStress:number):number
    {
        const deltaPp:number = ((fluidViscosity * fluidVelocity / (1500 * Math.pow(pipeInnerDiameter, 2)))
            + (yeildStress / (225 * pipeInnerDiameter))) * pipeLength;
        return deltaPp;
    }

    public static AnnularLaminarFlow(fluidViscosity:number,
                            fluidVelocity:number, pipeLength:number,
                            pipeOuterDiameter:number, holeInnerDiameter:number,
                            yeildStress:number):number
    {
        const annularSpace:number = holeInnerDiameter - pipeOuterDiameter;
        const deltaPp:number = ((fluidViscosity * fluidVelocity / (1000 * Math.pow(annularSpace, 2)))
                + (yeildStress / (200 * annularSpace))) * pipeLength;
        return deltaPp;
    }

    public static PipeTurbulentFlow(frictionFactor:number, fluidDensity:number,
                            fluidViscosity:number, fluidVelocity:number, pipeLength:number,
                            pipeInnerDiameter:number, absoluteRoughness:number = 0):number
    {
        let deltaPp:number = 0;
        if (absoluteRoughness == 0)
        {
            deltaPp = Math.pow(fluidDensity, 0.75) * Math.pow(fluidViscosity, 0.25) *
                Math.pow(fluidVelocity, 1.75) * pipeLength / (1800 * Math.pow(pipeInnerDiameter, 1.75));
        }
        else
        {
            deltaPp = frictionFactor * fluidDensity * Math.pow(fluidVelocity, 2) * pipeLength /
                        (25.8 * pipeInnerDiameter);
        }

        return deltaPp;


    }

    public static annularTurbulentFlow(frictionFactor:number, fluidDensity:number,
                            fluidViscosity:number, fluidVelocity:number, pipeLength:number,
                            pipeOuterDiameter:number, holeInnerDiameter:number, 
                            absoluteRoughness:number = 0):number
    {
        let deltaPp:number = 0;
        if (absoluteRoughness == 0)
        {
            deltaPp = Math.pow(fluidDensity, 0.75) * Math.pow(fluidViscosity, 0.25) *
                Math.pow(fluidVelocity, 1.75) * pipeLength /
                (1396 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 1.25));
        }
        else
        {
            deltaPp = frictionFactor * fluidDensity * Math.pow(fluidVelocity, 2) * pipeLength /
                        (21.1 * (holeInnerDiameter - pipeOuterDiameter));
        }

        return deltaPp;


    }
}