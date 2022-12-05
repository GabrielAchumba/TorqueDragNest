export const Optimization = {
    bitArea(nozzleSize:number, numberOfNozzles:number):number{
        const Ab = numberOfNozzles * Math.PI * Math.pow(nozzleSize, 2) / 4;
        return Ab;
    },
    OptimumBitPressureDrop(
        flowBehaviourIndex:number, bitHydraulicHorsePowermax:number):number{
        const deltaPbopt:number = flowBehaviourIndex * bitHydraulicHorsePowermax /
            (flowBehaviourIndex + 1);
        return deltaPbopt;
    },

    OptimumFlowRate(flowRate:number,
        flowBehaviourIndex:number, optimHyraulicPressureDrop:number,
        hyraulicPressureDrop:number):number{
        const term:number = (1 / flowBehaviourIndex)
            * Math.log10(optimHyraulicPressureDrop / hyraulicPressureDrop);
        const Qopt:number = flowRate * Math.pow(10, term);
        return Qopt;
    },

    OptimumBitJetForce(flowBehaviourIndex:number,
        optimumBitPressureDrop:number){
        const deltaPbopt:number = (flowBehaviourIndex + 1) * optimumBitPressureDrop /
            (flowBehaviourIndex + 2);
        return deltaPbopt;
    },

    OptimumJetFlowRate(flowBehaviourIndex:number,
        optimumBitPressureDrop:number, cConstant:number):number{
        const term:number = (2 * optimumBitPressureDrop) /
            (cConstant * (flowBehaviourIndex + 2));
        const Qopt:number = Math.pow(term, 1 / flowBehaviourIndex);
        return Qopt;
    },

    OptimumSurfacePressureDrop(
        flowBehaviourIndex:number, HydraulicHorsePowermax:number):number{
        const deltaPbopt:number = flowBehaviourIndex * HydraulicHorsePowermax /
            (flowBehaviourIndex + 2);
        return deltaPbopt;
    }
}