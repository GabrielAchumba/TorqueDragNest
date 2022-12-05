export const Regression = {

    LinearRegression(Xs:number[], Ys:number[]):any{
        let xAvg:number = 0; let yAvg:number = 0;
        let sxx:number = 0; let sxy:number = 0;
        let slope:number = 0; let intercept:number = 0;
        let i:number = 0; const n:number = Xs.length;

        for(i = 0; i < n; i++)
        {
            xAvg = xAvg + Xs[i];
            yAvg = yAvg + Ys[i];
        }

        xAvg = xAvg / n;
        yAvg = yAvg / n;

        for (i = 0; i < n; i++)
        {
            sxx = sxx + Math.pow(Xs[i]- xAvg, 2);
            sxy = sxy + ((Xs[i] - xAvg) * (Ys[i] - yAvg));
        }

        slope = sxy / sxx;
        intercept = yAvg - slope * xAvg;

        return { slope, intercept };

    }
}