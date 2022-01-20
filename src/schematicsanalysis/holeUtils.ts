import { BaseHoleSectionModel } from "../models/baseholesection";

export class HoleUtils {

    public static GetHoleSection(currentMD:number, holeSections:BaseHoleSectionModel[]):BaseHoleSectionModel
    {
        let holeSection:BaseHoleSectionModel = null;
        const nCount:number = holeSections.length; let i:number = 0;


        for (i = 0; i < nCount; i++)
        {

            if (currentMD >= holeSections[i].topOfHole && currentMD <= holeSections[i].bottomOfHole)
            {
                holeSection = holeSections[i];
                break;
            }
        }

        return holeSection;
    }
}