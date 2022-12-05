export const BinghamViscosity = {
    pipeEffectiveViscosity(plasticViscosity:number, pipeInnerDiameter:number,
                yeildPoint:number,  fluidVelocity:number):number{
        const muEff:number = plasticViscosity + 20 * pipeInnerDiameter * yeildPoint / (3 * fluidVelocity);
        return muEff;
    },

    annularEffectiveViscosity(plasticViscosity:number, pipeOuterDiameter:number,
         holeInnerDiameter:number, yeildPoint:number, fluidVelocity:number):number{
        const addend:number = (5 * (holeInnerDiameter - pipeOuterDiameter) * yeildPoint) / (fluidVelocity);
        const muEff:number = plasticViscosity + addend;
        return muEff;
    },

    PlasticViscosity(baseFannDialReading:number, baseFannRPM:number,
        fannDialReading:number,  fannRPM:number):number{
        const muP:number = (300 / (fannRPM - baseFannRPM)) * (fannDialReading - baseFannDialReading);
        return muP;

    },

    YeildPoint(fannDialReading:number, fannRPM:number, plasticViscosity:number):number{
        const tau:number = fannDialReading - plasticViscosity * fannRPM / 300;
        return tau;
    }
}