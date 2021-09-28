export class FluidRheology
{
    public static ShearStress(fannDialReadings:number):number
    {
        const tau:number = 0.01065 * fannDialReadings;
        return tau;
    }

    public static ShearRate(rPM:number):number
    {
        const gamma:number = 1.7033 * rPM;
        return gamma;
    }
}