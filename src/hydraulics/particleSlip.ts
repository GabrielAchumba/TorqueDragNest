export class ParticleSlip
{
    public static laminarParticleSlipVelocity(particleReynoldsNumber:number,
        fluidDensity:number, solidDensity:number,
        diameterOfSolids:number, fluidViscosity:number):number
    {
        const particleSlipVelocity:number = 138 * (solidDensity - fluidDensity) *
            Math.pow(diameterOfSolids, 2) / fluidViscosity;
        
        return particleSlipVelocity;
    }

    public static turbulentParticleSlipVelocity(particleReynoldsNumber:number,
        fluidDensity:number, solidDensity:number,
        diameterOfSolids:number, fluidViscosity:number,
        frictionalFactor:number):number
    {
        const particleSlipVelocity:number = 1.89 * (diameterOfSolids / frictionalFactor)
                * ((solidDensity - fluidDensity) / fluidDensity);

        return particleSlipVelocity;
    }

    public static particleReynoldsNumber(diameterOfSolids:number,
        fluidDensity:number, particleSlipVelocity:number,
        fluidViscosity:number):number
    {
        const rP:number = 928 * diameterOfSolids * fluidDensity *
            particleSlipVelocity / fluidViscosity;
        return rP;
    }

    public static laminarFrictionFactor(particleReynoldsNumber:number):number
    {
        const f:number = 24 / particleReynoldsNumber;
        return f;
    }

    public static turbulentFrictionFactor(particleReynoldsNumber:number,
        diameterOfSolids:number, particleSlipVelocity:number,
        solidDensity:number, fluidDensity:number):number
    {
        const f:number = 3.57 *(diameterOfSolids/Math.pow(particleSlipVelocity,2))*
            ((solidDensity - fluidDensity)/ fluidDensity);
        return f;
    }
}