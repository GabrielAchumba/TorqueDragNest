import { LargeNumberLike } from "crypto";

export const AxialForces = {
    Pip(S:number, t:number, Dbo:number):number{
        let pip:number = 0;
        if (Dbo > 0)
            pip = 0.875 * 2.0 * S * t / Dbo;
        return pip;
    },

    Pep(E:number, t:number, Dbo:number, v:number):number{
        let pep:number = 0;
        pep = (2.0 * E) / (1 - Math.pow(v, 2.0)) * (Math.pow((t / Dbo), 3.0));
        return pep;
    },
    TotalInsideActingPressure(pip:number,
        fluidDensityInsidePipe:number,
        trueVerticalDepth:number):number{
        const rho_i:number = fluidDensityInsidePipe / 144.0;

        const totalInsideActingPressure:number = pip + rho_i * trueVerticalDepth;
        return totalInsideActingPressure;
    },

    TotalOutsideActingPressure(pep:number,
      fluidDensityOutsidePipe:number,
      trueVerticalDepth:number):number{
        const rho_o:number = fluidDensityOutsidePipe / 144.0;

        const totalOutsideActingPressure:number = pep + rho_o * trueVerticalDepth;
        return totalOutsideActingPressure;
    },



    EffectiveAxialForce(compressiveForce:number,
                    totalInsideActingPressure:number,
                    totalOutsideActingPressure:number,
                    outsideArea:number, insideArea:number):number{
        //compressiveForce is in lbf (i.e pounds)
        //outsideArea is in sqInches, insideArea is in sqInches 
        //totalInsideActingPressure is in psi
        //totalOutsideActingPressure is in psi
        //effectiveAxialForce is in Ibf

        const effectiveAxialForce:number = compressiveForce
            + (totalOutsideActingPressure * outsideArea
            - totalInsideActingPressure * insideArea);

        return effectiveAxialForce;
    }
}