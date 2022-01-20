import { Guid } from "../models/guid"

// "start:debug": "nest start --debug --watch",
export interface ICustomPath {
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

    initializeData(xPath:number[], yPath:number[], typeOfPipe:string);

    CreatePath(minXValue:number, maxXValue:number,
    minYValue:number, maxYValue:number, actualXMax:number,
    actualYMax:number, actualXMin:number, actualYMin:number);

    ReScaleDimension(xMin:number, xMax:number, knownMin:number,
    knownMax:number, knownValue:number)
}
export const CustomPath = {
    id:'',
    typeOfPipe: '',
    strokeWidth: 0,
    stroke: '',
    fill: '',
    path: '',
    xPath: [],
    yPath:[],
    xPath_Drawing:[],
    yPath_Drawing:[],
    initializeData(xPath:number[], yPath:number[], typeOfPipe:string)
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
    },

    CreatePath(minXValue:number, maxXValue:number,
                minYValue:number, maxYValue:number, actualXMax:number,
                actualYMax:number, actualXMin:number, actualYMin:number)
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
    },

    ReScaleDimension(xMin:number, xMax:number, knownMin:number,
     knownMax:number, knownValue:number)
    {
        let x:number = 0;
        if ((knownMax - knownMin) != 0)
        {
            x = xMin + ((knownValue - knownMin) / (knownMax - knownMin)) * (xMax - xMin);
        }

        return x;
    }
} as ICustomPath