export class NewtonianPressureLoss
{
    public static PipeLaminarFlow(newtonianViscosity:number,
                            newtonianVelocity:number, pipeLength:number,
                            pipeInnerDiameter:number):number
    {
        const deltaPp:number = (newtonianViscosity * newtonianVelocity * pipeLength)
            / (1500 * Math.pow(pipeInnerDiameter, 2));
        return deltaPp;
    }

    public static AnnularLaminarFlow(newtonianViscosity:number,
                            newtonianVelocity:number, pipeLength:number,
                            pipeOuterDiameter:number, holeInnerDiameter:number):number
    {
        const deltaPp:number = (newtonianViscosity * newtonianVelocity * pipeLength)
            / (1000 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 2));
        return deltaPp;
    }

    public static pipeTurbulentFlow(frictionFactor:number, fluidDensity:number,
                            newtonianViscosity:number, newtonianVelocity:number,
                            pipeLength:number,
                            pipeInnerDiameter:number, absoluteRoughness:number = 0):number
    {
        let deltaPp:number = 0;
        if (absoluteRoughness == 0)
        {
            deltaPp = Math.pow(fluidDensity, 0.75) * Math.pow(newtonianViscosity, 0.25) *
                Math.pow(newtonianVelocity, 1.75) * pipeLength / (1800 * Math.pow(pipeInnerDiameter, 1.75));
        }
        else
        {
            deltaPp = frictionFactor * fluidDensity * Math.pow(newtonianVelocity, 2) * pipeLength /
                        (25.8 * pipeInnerDiameter);
        }

        return deltaPp;


    }

    public static annularTurbulentFlow(frictionFactor:number, fluidDensity:number,
                            newtonianViscosity:number, newtonianVelocity:number, pipeLength:number,
                            pipeOuterDiameter:number, holeInnerDiameter:number,
                            absoluteRoughness:number = 0):number
    {
        let deltaPp:number = 0;
        if (absoluteRoughness == 0)
        {
            deltaPp = Math.pow(fluidDensity, 0.75) * Math.pow(newtonianViscosity, 0.25) *
                Math.pow(newtonianVelocity, 1.75) * pipeLength /
                (1396 * Math.pow((holeInnerDiameter - pipeOuterDiameter), 1.25));
        }
        else
        {
            deltaPp = frictionFactor * fluidDensity * Math.pow(newtonianVelocity, 2) * pipeLength /
                        (21.1 * (holeInnerDiameter - pipeOuterDiameter));
        }

        return deltaPp;


    }

}