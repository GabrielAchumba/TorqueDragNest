import { Differentiation } from "./differentiation";

export const NonLinearEquations = {

    NewtonRaphson(fun:any, x0:number,
        Tol:number = 10E-6, MaxtIter:number = 100):number{

        let diff:number = 0; const fx:number = 0;
        let x1:number = x0; let StepSize:number = 0;
        let ARE:number = 10000; const Tol2:number = Math.abs(Tol * 100);
        let i:number = 0;

        for (i = 0; i <= MaxtIter; i++)
        {
            StepSize = x0 / Math.pow(10, 3);

            diff = Differentiation.Central(fun,
                x0, StepSize);

            if (diff == 0)
            {
                diff = 10E-5;
            }

            x1 = x0 - fun(x0) / diff;

            ARE = Math.abs((x1 - x0) / x1) * 100;

            if (ARE > Tol2)
            {
                x0 = x1;
            }
            else
            {
                break;
            }
        }

        return x0;
    }
}