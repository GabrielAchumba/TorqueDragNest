import { ParseUUIDPipe } from "@nestjs/common";
import { Guid } from "src/models/guid";
import { CommonDTO } from "./commonDTO";

export class SchematicDTO extends CommonDTO
{
    
    //holeSegments:HoleSegment[];
    //pipeSegments:PipeSegment[];
    xList:number[] = [];
    yList:number[] = [];
    xMax:number;
    yMax:number;
    pipes:CustomPath[];
}

export class CustomPath
{
    constructor(xPath:number[], yPath:number[], typeOfPipe:string)
    {

        this.stroke = "grey";
        this.fill = "none";
        this.path = "";
        this.strokeWidth = 2;
        this.xPath = xPath;
        this.yPath = yPath;
        this.id = Guid.NewGuid();
        this.xPath_Drawing = [];
        this.yPath_Drawing = [];
        this.typeOfPipe = typeOfPipe;
    }

    id:string;
    typeOfPipe:string;
    strokeWidth:number;
    stroke:string;
    fill:string;
    path:string;
    xPath:number[];
    yPath:number[];

    xPath_Drawing:number[];
    yPath_Drawing:number[];

    public CreatePath(minXValue:number, maxXValue:number,
                minYValue:number, maxYValue:number, actualXMax:number,
                actualYMax:number, actualXMin:number, actualYMin:number):void
    {

        if (this.typeOfPipe == "Hole")
        {
            this.stroke = "grey";
            this.fill = "#c0c0c0";
        }
        else 
        { 
            this.stroke = "black";
            this.fill = "#c0c0c0";
        }

        const space:string = " ";
        let i:number = 0;
        const nRows:number = this.xPath.length;
        let x:number = this.ReScaleDimension(minXValue, maxXValue, actualXMin,
        actualXMax, this.xPath[0]); this.xPath_Drawing.push(x);

        let y:number = this.ReScaleDimension(minYValue, maxYValue, actualYMin,
        actualYMax, this.yPath[0]); this.yPath_Drawing.push(y);

        this.path = "M"
        + x.toString() 
        + space 
        + y.toString() 
        + space;

        for (i = 1; i < nRows; i++)
        {
            x = this.ReScaleDimension(minXValue, maxXValue, actualXMin,
            actualXMax, this.xPath[i]); this.xPath_Drawing.push(x);

            y = this.ReScaleDimension(minYValue, maxYValue, actualYMin,
            actualYMax, this.yPath[i]); this.yPath_Drawing.push(y);

            this.path = this.path 
            + "L" 
            + x.toString()
            + space 
            + y.toString()
            + space;
        }

        this.path = this.path + "Z";
    }

    private ReScaleDimension(xMin:number, xMax:number, knownMin:number,
     knownMax:number, knownValue:number):number
    {
        let x:number = 0;
        if ((knownMax - knownMin) != 0)
        {
            x = xMin + ((knownValue - knownMin) / (knownMax - knownMin)) * (xMax - xMin);
        }

        return x;
    }
}