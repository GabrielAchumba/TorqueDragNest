import { AreaType } from "src/models/enums";

export class Stress {

    public static ShearStress(initialShearStress:number, plasticViscosity:number,
         shearRateInAnnulus:number):number
    {
        const stress:number = initialShearStress + plasticViscosity * shearRateInAnnulus / 479;
        return stress;
    }
    public static RadialStress(innerPressure:number, outerPressure:number,
         areaType:AreaType):number
    {
        let stress:number = 0;
        switch (areaType)
        {
            case AreaType.Inner:
                stress = -innerPressure;
                break;
            case AreaType.Outer:
                stress = -outerPressure;
                break;
        }

        return stress;
    }

    public static HoopStress(innerPressure:number, outerPressure:number,
        innerArea:number, outerArea:number, areaType:AreaType):number
    {
        let stress:number = 0;
        const denominator:number = outerArea - innerArea;
        if (denominator == 0) return stress;
        switch (areaType)
        {
            case AreaType.Inner:
                stress = (2 * innerPressure * innerArea - outerPressure * (innerArea + outerArea)) / denominator;
                break;
            case AreaType.Outer:
                stress = (innerPressure * (innerArea + outerArea) - 2 * outerPressure * outerArea) / denominator;
                break;
        }

        return stress;
    }

    public static VonMises(innerAxialStress:number, innerHoopStress:number, innerRadialStress:number,
        outerAxialStress:number, outerHoopStress:number, outerRadialStress:number,
        areaType:AreaType)
    {
        let stress:number = 0;

        switch (areaType)
        {
            case AreaType.Inner:
                stress = (1 / Math.sqrt(2.0)) * Math.pow((Math.pow(innerAxialStress - innerHoopStress, 2.0) +
            Math.pow(innerHoopStress - innerRadialStress, 2) + Math.pow(innerRadialStress - innerAxialStress, 2)), 0.5);
                break;
            case AreaType.Outer:
                stress = (1 / Math.sqrt(2.0)) * Math.pow((Math.pow(outerAxialStress - outerHoopStress, 2.0) +
            Math.pow(outerHoopStress - outerRadialStress, 2) + Math.pow(outerRadialStress - outerAxialStress, 2)), 0.5);
                break;
        }
        return stress;
    }

    public static TorsionalStress(torque:number, polarMomentOfInertia:number, radius:number):number
    {
        let stress:number = 0;
        if (polarMomentOfInertia == 0) return stress;
                stress = 12.0 * torque * radius / polarMomentOfInertia;

        return stress;
    }

    public static AxialStress(tensileForce:number, area:number, bendingStress:number,
         bucklingStress:number):number
    {
        const stress:number = (tensileForce/area) + bendingStress + bucklingStress;
        return stress;
    }

    public static BendingStress(youngsModulus:number, pipeDiameter:number, dogLegSeverity:number):number
    {
        const stress:number = youngsModulus * (pipeDiameter / 2.0) * dogLegSeverity / 68755.0;
        return stress;
    }

    public static BucklingStress(pipeDiameter:number, radialClearance:number, tensionTopOfPipe:number,
                                        momentOfInertia:number):number
    {
        const stress:number = (pipeDiameter / 2.0) * radialClearance
                        * tensionTopOfPipe / (2 * momentOfInertia);
        return stress;
    }
}