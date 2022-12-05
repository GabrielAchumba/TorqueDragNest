export const PressureLoss = {
    SurfaceSystem(surfaceSystemConstant:number,
        mudWeight:number, pumpOutput:number):number{
        const surfaceSystemPressLoss:number = surfaceSystemConstant *
            mudWeight * Math.pow(pumpOutput / 100.0, 1.86);
        return surfaceSystemPressLoss;
    },

    NozzleFlowArea(nozzleSize:number,
            numberOfNozzles:number){
        const An:number = (numberOfNozzles * Math.PI/4) * Math.pow(nozzleSize,2);

        return An;
    },

    NozzleVelocity(mudFlowRate:number,
            nozzleFlowArea:number):number{
        const Vn:number = 0.3208 * mudFlowRate / nozzleFlowArea;
        return Vn;
    },

    NozzleFlowArea2(mudFlowRate:number,
        mudDensity:number, dischargeCoefficient:number,
        deltaPb:number):number{
        const nozzleArea = Math.sqrt(8.311 * Math.pow(10, -5) * mudDensity
            * Math.pow(mudFlowRate, 2) / (Math.pow(dischargeCoefficient, 2) * deltaPb));
        return nozzleArea;
    },

    AcrossBit(mudFlowRate:number,
        mudDensity:number, dischargeCoefficient:number,
        nozzleFlowArea:number):number{
        const deltaPb:number = 8.311 * Math.pow(10, -5) * mudDensity
            * Math.pow(mudFlowRate, 2) / (Math.pow(dischargeCoefficient, 2) *
            Math.pow(nozzleFlowArea, 2));
        return deltaPb;
    },

    AcrossBit2(mudDensity:number,
        nozzleVelocity:number):number{
        const deltaPb:number = mudDensity * Math.pow(nozzleVelocity, 2)
            / 1120.0;
        return deltaPb;
    },
    BitHydraulicPower(mudFlowRate:number,
        bitPressureLoss:number, pumpEfficiency:number):number{
        const hPb:number = mudFlowRate * bitPressureLoss / (1714.0 * pumpEfficiency);
        return hPb;
    },

    HydraulicBitImpactForce(dischargeCoefficient:number,
        mudFlowRate:number, mudDensity:number, bitPressureLoss:number):number{
        const Fimp:number = 0.01823 * dischargeCoefficient * mudFlowRate *
            Math.sqrt(mudDensity * bitPressureLoss);
        return Fimp;
    },

    HydraulicBitImpactForce3(mudDensity:number,
        bitPressureLoss:number, mudFlowRate:number):number{
        const Fimp:number = mudFlowRate * Math.sqrt(mudDensity
            * bitPressureLoss) / 57.66;
        return Fimp;
    },

    HydraulicBitImpactForce2(mudDensity:number,
        mudFlowRate:number, nozzleVelocity:number):number{
        const Fimp:number = mudDensity * mudFlowRate
            * nozzleVelocity / 1930.0;
        return Fimp;
    },

    flowRateFromHorsePower(
        flowEfficiency:number, horsePower:number,
        pumpPressure:number):number{
        const pumpRate:number = 1714 * horsePower * flowEfficiency /
                            pumpPressure;
        return pumpRate;
    },

    surfacePressureLoss(surfaceSystemConstant:number, mudWeight:number, 
        pumpRate:number):number{
        const dPs:number = surfaceSystemConstant * mudWeight * Math.pow((pumpRate / 100), 1.86);
        return dPs;
    }
}