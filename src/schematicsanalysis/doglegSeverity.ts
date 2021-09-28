export class DoglegSeverity
{
    private static LubrinskiMethod(surveyDriftAngle1:number, surveyDriftAngle2:number, 
        directionChange:number, courseLength:number, dogleg:number = null):number
    {
        let dLS:number = 0;
        //surveyDriftAngle1 is in radians, surveyDriftAngle2 is in radians
        //directionChange in radians,DLS is in degrees/100ft
        if (dogleg == null)
        {
            dogleg = Math.sqrt(Math.pow(surveyDriftAngle1, 2) + Math.pow(surveyDriftAngle2, 2) -
            2 * surveyDriftAngle1 * surveyDriftAngle2 * Math.cos(directionChange));
        }

        dLS = 0;
        if(courseLength != 0)
        {
            dLS = dogleg * 100 / courseLength;
        }
        
        return dLS;

    }

    private static CurvatureMethod(courseLength:number, upperInclination:number, lowerInclination:number,
                                            upperAzimuth:number, lowerAzimuth:number, dogleg:number = null):number
    {
        let term1:number = 0, term2:number = 0, term3:number = 0, dLS:number = 0;
        let _dogleg:number = 0;
        _dogleg = dogleg;
        if (_dogleg == null)
        {
            term1 = Math.cos(lowerInclination) * Math.cos(upperInclination);
            term2 = Math.sin(lowerInclination) * Math.sin(upperInclination);
            term3 = Math.cos(upperAzimuth - lowerAzimuth);
            _dogleg = (Math.acos((term1 + term2) * term3));
        }


        dLS = _dogleg * 100.0 / courseLength;
        return dLS;
    }

    private static TangentialMethod(courseLength:number, upperInclination:number, lowerInclination:number,
                                upperAzimuth:number, lowerAzimuth:number, dogleg:number = null):number
    {
        let _dogleg:number = 0;
        let term1:number = 0, term2:number = 0, term3:number = 0, term4:number = 0, dLS:number = 0;
        _dogleg = dogleg;
        if (_dogleg == null)
        {
            term1 = Math.sin(lowerInclination) * Math.sin(upperInclination);
            term2 = Math.sin(lowerAzimuth) * Math.sin(upperAzimuth);
            term3 = Math.cos(lowerAzimuth) * Math.cos(upperAzimuth);
            term4 = Math.cos(lowerInclination) * Math.cos(upperInclination);
        }


        dLS = 1 / (courseLength * _dogleg);
        return dLS;
    }

    public static DogLegSeverity(courseLength:number, upperInclination:number, lowerInclination:number,
                                upperAzimuth:number, lowerAzimuth:number, Method:string, dogleg:number = null)
    {
        let dLS:number = 0;

        switch (Method)
        {
            case "Lubrinski":
                const directionChange:number = upperAzimuth - lowerAzimuth;
                dLS = this.LubrinskiMethod(lowerInclination, upperInclination, directionChange, courseLength, dogleg);
                break;
            case "Curvature":
                dLS = this.CurvatureMethod(courseLength, upperInclination, lowerInclination,
                                         upperAzimuth, lowerAzimuth, dogleg);
                break;
            case "Tangential":
                dLS = this.TangentialMethod(courseLength, upperInclination, lowerInclination,
                                             upperAzimuth, lowerAzimuth, dogleg);
                break;
        }

        return dLS;
    }
}