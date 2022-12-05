import { BaseHoleSectionModel } from "../models/baseholesection";
import { BasePipeModel, Pipe } from "../models/basepipe";
import { DeviationSurveyModel } from "../models/deviationSurvey";
import { MudPVTModel } from "../models/mudpvt";
import { TorqueDragDesignWithGuid } from "../models/torquedragdesign";

export const Sorting = {

    SortListofTorqueDragDesign(torqueDragDesigns:TorqueDragDesignWithGuid[]){
        const sortArray:TorqueDragDesignWithGuid[] = torqueDragDesigns.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.designDate > b.designDate) //decreasing order
              return -1;
            return 0;
          });

        return sortArray;
    },

    SortListofDeviationSurvey(deviationSurveys:DeviationSurveyModel[]): DeviationSurveyModel[]{
        const sortArray:DeviationSurveyModel[] = deviationSurveys.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth < b.measuredDepth) //increasing order
              return -1;
            return 0;
          });


        return sortArray;
    },

    SortListofHoleSection(holeSections:BaseHoleSectionModel[]): BaseHoleSectionModel[]
    {
        const sortArray:BaseHoleSectionModel[] = holeSections.map((row:BaseHoleSectionModel) => {

            if(row != null && (row.outerDiameter == undefined || row.outerDiameter <= 0)){
                row.outerDiameter = row.innerDiameter;
            }
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.bottomOfHole < b.bottomOfHole) // Increasing Order
                return -1;
            return 0;
            });

        return sortArray;
    },

    ReverseSortListofHoleSection(holeSections: BaseHoleSectionModel[]):BaseHoleSectionModel[]
    {
        const sortArray:BaseHoleSectionModel[] = holeSections.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.bottomOfHole > b.bottomOfHole) // decreasing order
              return -1;
            return 0;
          });

        return sortArray;
    },

    SortListofPipe(pipes: Pipe[]): Pipe[]
    {
        const sortArray:Pipe[] = pipes.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth < b.measuredDepth) // Increasing order
              return -1;
            return 0;
          });

        return sortArray;
    },

    SortListofPipe2(pipes: BasePipeModel[]): BasePipeModel[]
    {
        const sortArray:BasePipeModel[] = pipes.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth < b.measuredDepth) // increasing order
              return -1;
            return 0;
          });

        return sortArray;
    },

    SortListofPipeReversed(pipes:BasePipeModel[]): Pipe[]
    {
        const sortArray:Pipe[] = pipes.map((row) => {
            let newRow = {} as Pipe;
            newRow = Object.assign(newRow, row);
            return newRow;
        });

        sortArray.sort((a, b) => {
            if (a.measuredDepth > b.measuredDepth) // decreasing order
              return -1;
            return 0;
        });

        return sortArray;
    },

    SortListofMudPVT(mudPVTs:MudPVTModel[]):MudPVTModel[]
    {
        const sortArray:MudPVTModel[] = mudPVTs.map((row) => {
            return row;
        });

        sortArray.sort((a, b) => {
            if (a.pressure < b.pressure) // increasing order
              return -1;
            return 0;
        });

        return sortArray;
    }
}