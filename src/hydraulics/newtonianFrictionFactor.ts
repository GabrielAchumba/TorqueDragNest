import { NonLinearEquations } from "../mathematics/nonLinearEquations";

export class newtonianFrictionFactor
{
    public static pipeLaminarFlow(ReynoldsNumber:number):number
    {
        const frictionFactor:number = 16.0 / ReynoldsNumber;
        return frictionFactor;
    }

    public static annularLaminarFlow(ReynoldsNumber:number):number
    {
        const frictionFactor:number = 24.0 / ReynoldsNumber;
        return frictionFactor;
    }

    public static pipeTurbulentFlow(ReynoldsNumber:number, innerDiameter:number,
                                            absoluteRoughness:number):number
    {
        //ReynoldsNumber = 17831;
        const Fun = (x:number) => {
            //double relativeRoughness = 0.0000034;
            const relativeRoughness:number = absoluteRoughness / innerDiameter;
            const ans:number = (1.0 / Math.sqrt(x)) 
            + 4.0 * Math.log(((relativeRoughness / 3.7) 
            + (1.255 / (ReynoldsNumber * Math.sqrt(x)))));
            return ans;
        };

        const x0 = 0.0001;
        const frictionFactor:number = NonLinearEquations.NewtonRaphson(Fun, x0);
        return frictionFactor;
    }

    public static annularTurbulentFlow(ReynoldsNumber:number, pipeOuterDiameter:number, 
        holeInnerDiameter:number, absoluteRoughness:number):number
    {

        const Fun = (x:number)  => {
            const relativeRoughness:number = absoluteRoughness / (holeInnerDiameter - pipeOuterDiameter);
            const ans:number = (1.0 / Math.sqrt(x)) + 4.0 * Math.log(((relativeRoughness / 3.7) 
            + (1.255 / (ReynoldsNumber * Math.sqrt(x)))));
            return ans;
        };

        const x0:number = 0.0001;
        const frictionFactor:number = NonLinearEquations.NewtonRaphson(Fun, x0);
        return frictionFactor;
    }
}