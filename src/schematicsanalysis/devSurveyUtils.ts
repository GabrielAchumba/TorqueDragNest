import { DeviationSurveyModel } from "src/models/deviationSurvey";
import { DoglegSeverity } from "./doglegSeverity";

export class DevSurveyUtils
{
    public static GetDevSurveyMDs(deviationSurveys:DeviationSurveyModel[]):number[]
    {
        let i:number = 0; const nCount:number = deviationSurveys.length;
        let MD:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            MD.push(deviationSurveys[i].measuredDepth);
        }

        return MD;
    }

    public static GetDevSurveyTVDs(deviationSurveys:DeviationSurveyModel[]):number[]
    {
        let i:number = 0; const nCount:number = deviationSurveys.length;
        let TVD:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            TVD.push(deviationSurveys[i].trueVerticalDepth);
        }

        return TVD;
    }

    public static GetDevSurveyVerticalSections(deviationSurveys:DeviationSurveyModel[]):number[]
    {

        let i:number = 0; const nCount:number = deviationSurveys.length;
        let VerticalSections:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            VerticalSections.push(deviationSurveys[i].verticalSection);
        }

        return VerticalSections;
    }

    public static GetDevSurveyInclinations(deviationSurveys:DeviationSurveyModel[]):number[]
    {

        let i:number = 0; const nCount:number = deviationSurveys.length;
        let Inc:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            Inc.push(deviationSurveys[i].inclination);
        }

        return Inc;
    }

    public static GetDevSurveyAzimuths(deviationSurveys:DeviationSurveyModel[]):number[]
    {

        let i:number = 0; const nCount:number = deviationSurveys.length;
        let az:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            az.push(deviationSurveys[i].azimuth);
        }

        return az;
    }

    public static GetDevSurveyDogLeg(deviationSurveys:DeviationSurveyModel[]):number[]
    {

        let i:number = 0; const nCount:number = deviationSurveys.length;
        let doglegSeverity:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            doglegSeverity.push(deviationSurveys[i].doglegSeverity);
        }

        return doglegSeverity;
    }

    public static GetDoglegSeverity(deviationSurveys:DeviationSurveyModel[], doglegSeverityMethod:string):DeviationSurveyModel[]
    {
        let i:number = -1,  courseLength:number = 0;
        const newDeviationSurveys:DeviationSurveyModel[] = deviationSurveys.map((row:DeviationSurveyModel) => {
            let newRow:DeviationSurveyModel = new DeviationSurveyModel();
            newRow = Object.assign(newRow, row);
            i++;

            if (i == 0) newRow.doglegSeverity = 0;
            else
            {
                const lower_deviationSurvey:DeviationSurveyModel = deviationSurveys[i - 1];
                courseLength = newRow.measuredDepth - lower_deviationSurvey.measuredDepth;
                newRow.doglegSeverity = DoglegSeverity.DogLegSeverity(courseLength, newRow.inclination,
                lower_deviationSurvey.inclination, newRow.azimuth, lower_deviationSurvey.azimuth, doglegSeverityMethod);
            }

            return newRow;

        });

        return newDeviationSurveys;

    }
}