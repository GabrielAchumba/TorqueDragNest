export class Differentiation {

    public static Central(fun:any, x:number, stepsize:number)
    {
        let Av:number = 0;
        let x1:number = 0;
        let x2:number = 0;
        x1 = x + stepsize;
        x2 = x - stepsize;
        Av = (fun(x1) - fun(x2)) / (2 * stepsize);
        return Av;
    }

}