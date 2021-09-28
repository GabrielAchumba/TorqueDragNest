export class NewtonianViscosity
{
    public static PlasticViscosity(fannDialReading:number, fannRPM:number)
    {
        const muN:number = 300 * fannDialReading / fannRPM;
        return muN;
    }
}