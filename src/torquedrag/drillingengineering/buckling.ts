export const Buckling = {
    CriticalInclinationAngle(EI:number,
        pipeBuoyedWeight:number, rc:number):number{
        const criticalInclinationAngle:number = Math.asin(Math.sqrt(1.94 / 2.0) *
            rc * Math.pow((pipeBuoyedWeight / EI), 1.0 / 3.0));
        return criticalInclinationAngle;
    },

    CriticalSinusoidalBuckling(EI:number,
        pipeBuoyedWeight:number, inclination:number = 0, rc:number = 0,
        IsDeviatedWell:boolean = false):number{
        let sinusoidalBuckling:number = 0;
        if (IsDeviatedWell == false)
        {
            sinusoidalBuckling = this.CriticalSinusoidalBucklingVerticalWell(EI, pipeBuoyedWeight);
        }
        else
        {
            sinusoidalBuckling = this.CriticalSinusoidalBucklingDeviated(EI,
                        pipeBuoyedWeight, inclination, rc);
        }

        return sinusoidalBuckling;
    },

    CriticalHelicalBuckling(EI:number,
        pipeBuoyedWeight:number, inclination:number = 0, rc:number = 0,
        IsDeviatedWell:boolean = false):number{
        let sinusoidalBuckling:number = 0;
        if (IsDeviatedWell == false)
        {
            sinusoidalBuckling = this.CriticalHelicalBucklingVerticalWell(EI, pipeBuoyedWeight);
        }
        else
        {
            sinusoidalBuckling = this.CriticalHelicalBucklingDeviated(EI, pipeBuoyedWeight, inclination, rc);
        }

        return sinusoidalBuckling;
    },

    CriticalSinusoidalBucklingVerticalWell(EI:number,
        pipeBuoyedWeight:number):number{
        const sinusoidalBuckling:number = 1.94 * Math.pow((EI * Math.pow(pipeBuoyedWeight, 2.0)),
            1.0 / 3.0);
        return sinusoidalBuckling;
    },

    CriticalHelicalBucklingVerticalWell(EI:number,
        pipeBuoyedWeight:number):number{
        const sinusoidalBuckling:number = 4.05 * Math.pow((EI * Math.pow(pipeBuoyedWeight, 2.0)),
            1.0 / 3.0);
        return sinusoidalBuckling;
    },

    CriticalSinusoidalBucklingDeviated(EI:number,
        pipeBuoyedWeight:number, inclination:number, rc:number):number{
        const sinusoidalBuckling:number = 2.0 * Math.sqrt((EI * pipeBuoyedWeight *
            Math.sin(inclination)) / rc);
        return sinusoidalBuckling;
    },

    CriticalHelicalBucklingDeviated(EI:number,
        pipeBuoyedWeight:number, inclination:number, rc:number):number{
        const sinusoidalBuckling:number = 1.83 * Math.sqrt((4.0 * EI * pipeBuoyedWeight *
            Math.sin(inclination)) / rc);
        return sinusoidalBuckling;
    },
    HelicalBuckling_Horizontal(youngsModulus:number, buoyancyFactor:number,
                        momentOfInertia:number, weightInAir:number,
                        clearanceRadial:number):number{
        let helicalBuckling_Horizontal:number = 0;
        let term1:number = 0, criticalSinusoidalBuckling:number = 0;

        //momentOfInertia is in inch^4, unitWeightOfPipeInAir is in Lbs/inch
        //clearanceRadial is in inch
        //criticalSinusoidalBuckling is in Lbs
        //helicalBuckling_Horizontal is in Lbs

        term1 = youngsModulus * momentOfInertia
                * buoyancyFactor * weightInAir /
                clearanceRadial;

        criticalSinusoidalBuckling = 2.0 * Math.sqrt(term1);
        helicalBuckling_Horizontal = (2.0 * Math.sqrt(2) - 1)
            * criticalSinusoidalBuckling;

        return helicalBuckling_Horizontal;

    },

    HelicalBuckling_Inclined(youngsModulus:number, buoyancyFactor:number,
                        momentOfInertia:number, weightInAir:number,
                        clearanceRadial:number, inclination:number):number{
        let helicalBuckling_Inclined:number = 0;
        let term1:number = 0, criticalSinusoidalBuckling:number = 0;

        //momentOfInertia is in inch^4, unitWeightOfPipeInAir is in Lbs/inch
        //clearanceRadial is in inch
        //criticalSinusoidalBuckling is in Lbs
        //helicalBuckling_Horizontal is in Lbs

        term1 = youngsModulus * momentOfInertia
                * buoyancyFactor * weightInAir * Math.sin(inclination) /
                clearanceRadial;

        criticalSinusoidalBuckling = 2.0 * Math.sqrt(term1);
        helicalBuckling_Inclined = (2.0 * Math.sqrt(2) - 1)
            * criticalSinusoidalBuckling;

        return helicalBuckling_Inclined;

    },

    HelicalBuckling_Vertical(youngsModulus:number, buoyancyFactor:number,
                        momentOfInertia:number, weightInAir:number):number{
        let helicalBuckling_Vertical:number = 0;
        let term1:number = 0, criticalSinusoidalBuckling:number = 0;

        //momentOfInertia is in inch^4, unitWeightOfPipeInAir is in Lbs/inch
        //clearanceRadial is in inch
        //criticalSinusoidalBuckling is in Lbs
        //helicalBuckling_Horizontal is in Lbs

        term1 = youngsModulus * momentOfInertia
                    * Math.pow(buoyancyFactor * weightInAir, 2.0);

        criticalSinusoidalBuckling = 2.55 * Math.pow(term1, 3.0);
        helicalBuckling_Vertical = 2.18 * criticalSinusoidalBuckling;

        return helicalBuckling_Vertical;

    },

    HelicalBuckling(youngsModulus:number, buoyancyFactor:number,
                        momentOfInertia:number, weightInAir:number,
                        clearanceRadial:number, inclination:number, 
                        IsDeviatedWell:boolean = false):number{
        let helicalBuckling:number = 0;
        const inclinationDegrees:number = inclination * 180.0 / Math.PI;
        if (IsDeviatedWell == false)
        {
            helicalBuckling = this.HelicalBuckling_Vertical(youngsModulus, buoyancyFactor,
                        momentOfInertia, weightInAir);
        }
        else
        {
            if (inclinationDegrees < 85.0)
            {
                helicalBuckling = this.HelicalBuckling_Inclined(youngsModulus, buoyancyFactor,
                                            momentOfInertia, weightInAir,
                                            clearanceRadial, inclination);
            }
            else
            {
                helicalBuckling = this.HelicalBuckling_Horizontal(youngsModulus, buoyancyFactor,
                        momentOfInertia, weightInAir,
                        clearanceRadial);
            }
        }

        return helicalBuckling;
    }
}