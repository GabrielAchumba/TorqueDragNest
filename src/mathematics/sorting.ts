import { BaseHoleSectionModel } from "src/models/baseholesection";
import { BasePipeModel, Pipe } from "src/models/basepipe";
import { DeviationSurveyModel } from "src/models/deviationSurvey";
import { MudPVTModel } from "src/models/mudpvt";
import { TorqueDragDesignWithGuid } from "src/models/torquedragdesign";

export class Sorting {

    public static SortListofTorqueDragDesign(torqueDragDesigns:TorqueDragDesignWithGuid[])
    {
        const sortArray:TorqueDragDesignWithGuid[] = torqueDragDesigns.map((row) => {
            return row;
        });

        //console.log('(1) sortArray: ', sortArray);

        sortArray.sort((a, b) => {
            if (a.designDate > b.designDate)
              return -1;
            return 0;
          });

        //console.log('(2) sortArray: ', sortArray);
        return sortArray;
    }

    public static SortListofDeviationSurvey(deviationSurveys:DeviationSurveyModel[]): DeviationSurveyModel[]
    {
        const sortArray:DeviationSurveyModel[] = deviationSurveys.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth > b.measuredDepth)
              return -1;
            return 0;
          });


        return sortArray;
    }

    public static SortListofHoleSection(holeSections:BaseHoleSectionModel[]): BaseHoleSectionModel[]
    {
        const sortArray:BaseHoleSectionModel[] = holeSections.map((row:BaseHoleSectionModel) => {

            if(row != null && (row.outerDiameter == undefined || row.outerDiameter <= 0)){
                row.outerDiameter = row.innerDiameter;
            }
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.bottomOfHole > b.bottomOfHole)
                return -1;
            return 0;
            });

        return sortArray;
    }

    public static ReverseSortListofHoleSection(holeSections: BaseHoleSectionModel[]):BaseHoleSectionModel[]
    {
        const sortArray:BaseHoleSectionModel[] = holeSections.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.bottomOfHole > b.bottomOfHole)
              return -1;
            return 0;
          });

        return sortArray;
    }

    public static SortListofPipe(pipes: Pipe[]): Pipe[]
    {
        const sortArray:Pipe[] = pipes.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth > b.measuredDepth)
              return -1;
            return 0;
          });

        return sortArray;
    }

    public static SortListofPipe2(pipes: BasePipeModel[]): BasePipeModel[]
    {
        const sortArray:BasePipeModel[] = pipes.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth > b.measuredDepth)
              return -1;
            return 0;
          });

        return sortArray;
    }

    public static SortListofPipeReversed(pipes:BasePipeModel[]): Pipe[]
    {
        const sortArray:Pipe[] = pipes.map((row) => {
            let newRow:Pipe = new Pipe();
            newRow = Object.assign(newRow, row);
            return newRow;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth < b.measuredDepth)
              return -1;
            return 0;
        });

        return sortArray;
    }

    public static SortListofMudPVT(mudPVTs:MudPVTModel[]):MudPVTModel[]
    {
        const sortArray:MudPVTModel[] = mudPVTs.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.pressure > b.pressure)
              return -1;
            return 0;
        });

        return sortArray;
    }
}