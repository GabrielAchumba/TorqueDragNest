export const Interpolation = {

    LinearInterpolation(Xs:number[], Ys:number[], X:number):number {
        let curr:number = 1;
        let check:boolean = false;
        let Y:number = Ys[0];
        let XsCount:number = Xs.length;

        while (curr < XsCount)
        {
            if (X >= Xs[curr - 1] && X <= Xs[curr])
            {
                check = true;
                break;
            }
            curr++;
        }
        if (check)
        {
            const prev:number = curr - 1;
            const m:number = (Ys[curr] - Ys[prev]) / (Xs[curr] - Xs[prev]);
            const c:number = Ys[prev];
            const x:number = X - Xs[prev];

            Y = m * x + c;
        }

        return Y;
    }      
}