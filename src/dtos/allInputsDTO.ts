import { BaseHoleSectionModel } from "src/models/baseholesection";
import { BasePipeModel } from "src/models/basepipe";
import { Common } from "src/models/common";
import { Datum } from "src/models/datum";
import { DeviationSurveyModel } from "src/models/deviationSurvey";
import { DrillBit } from "src/models/drillbit";
import { Fluid } from "src/models/fluid";
import {MudPVTModel } from "src/models/mudpvt";
import { Operation } from "src/models/operation";
import { Rig } from "src/models/rig";
import { CommonDTO } from "./commonDTO";

export class AllInputsDTO extends CommonDTO
{
    rig:Rig;
    drillBit:DrillBit;
    datum:Datum;
    deviationSurveys:DeviationSurveyModel[];
    fluid:Fluid;
    holeSections:BaseHoleSectionModel[];
    mudPVTs:MudPVTModel[];
    operation:Operation;
    pipes:BasePipeModel[];
    common:Common;

    terminalMD:number;
    pipeSize:number;
    holeSize:number;
    minXValue:number;
    maxXValue:number;
    minYValue:number;
    maxYValue:number;
    canvasDepth:number;
    canvasWidth:number;
    xCanvasOffset:number;
    yCanvasOffset:number;



    convertDevSurveyUnits():void
    {
        const pi:number = Math.PI;
        let i:number = 0, ndeviationSurveys:number = this.deviationSurveys.length;
        for (i = 0; i < ndeviationSurveys; i++)
        {
            this.deviationSurveys[i].azimuth 
            = this.deviationSurveys[i].azimuth * pi / 180.0;
            this.deviationSurveys[i].inclination 
            = this.deviationSurveys[i].inclination * pi / 180.0;
        }
    }

    ReScaleHoleDiameter():void
    {
        let i:number = 0, ncount:number = this.holeSections.length;
        for (i = 0; i < ncount; i++)
        {
            this.holeSections[i].outerDiameter 
            = this.holeSections[i].outerDiameter * 10;
        }
    }
}