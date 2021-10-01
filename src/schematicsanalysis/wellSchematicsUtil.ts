import { AllInputsDTO } from "src/dtos/allInputsDTO";
import { CustomPath, SchematicDTO } from "src/dtos/schematicDTO ";
import { Interpolation } from "src/mathematics/interpolation";
import { Sorting } from "src/mathematics/sorting";
import { Spacing } from "src/mathematics/spacing";
import { BaseHoleSectionModel } from "src/models/baseholesection";
import { BasePipeModel } from "src/models/basepipe";
import { DevSurveyUtils } from "./devSurveyUtils";

class Piping {
    constructor(_x:number[]){
        this.x = _x;
    }
    x:number[] = [];
}
export class WellSchematicsUtil
{
    public static allInputs:AllInputsDTO

    public static DrawSchematics():SchematicDTO
    {
        this.allInputs.pipes = Sorting.SortListofPipe2(this.allInputs.pipes);
        this.allInputs.holeSections = Sorting.SortListofHoleSection(this.allInputs.holeSections);

        const MDs:number[] = DevSurveyUtils.GetDevSurveyMDs(this.allInputs.deviationSurveys);

        const VSecs:number[] = DevSurveyUtils.GetDevSurveyVerticalSections(this.allInputs.deviationSurveys);

        const pipeMDs:number[] = this.GetPipesMDs(this.allInputs.pipes);

        const holeMDs:number[] = this.GetHolesMDs(this.allInputs.holeSections);

        let mDMin:number = 0;
        let mDMax:number = Math.max(...MDs);
        let vSecsMax:number = Interpolation.LinearInterpolation(MDs, VSecs, this.allInputs.terminalMD);
        let vSecsMin:number = Math.min(...VSecs);
        const size:number = vSecsMin + ((vSecsMax - vSecsMin) / 10.0);
        const clearance:number = 0.5;

        this.allInputs.holeSize = size;
        this.allInputs.pipeSize = this.allInputs.holeSize * clearance;

        let pipes:CustomPath[] = [];
        let pipe:Piping[] = [];
        const PipeTypes:string[] = [];
        PipeTypes.push("Hole");
        PipeTypes.push("Tubing");

        let j:number = 0, nRows:number = PipeTypes.length;
        let i:number = 0;
        let schematicDTO:SchematicDTO = new SchematicDTO();
        let xMaxList:number[] = [];
        let yMaxList:number[] = [];
        let xMinList:number[] = [];
        let yMinList:number[] = [];

        const tubingCounter:number = pipeMDs.length;
        const holeCounter:number= holeMDs.length;

        for (j = 0; j < 2; j++)
        {

            if (PipeTypes[j] == "Tubing")
            {
                if(pipeMDs[0] <= this.allInputs.terminalMD)
                {
                    pipe = this.Draw_Tubing(0, pipeMDs[0], this.allInputs.pipeSize, VSecs, MDs, this.allInputs.holeSize);
                    xMaxList.push(Math.max(...pipe[0].x));
                    yMaxList.push(Math.max(...pipe[1].x));
                    xMinList.push(Math.min(...pipe[0].x));
                    yMinList.push(Math.min(...pipe[1].x));
                    pipes.push(new CustomPath(pipe[0].x, pipe[1].x, PipeTypes[j]));
                }
                
            }
            else
            {
                if (holeMDs[0] <= this.allInputs.terminalMD)
                {
                    pipe = this.Draw_Tubing(0, holeMDs[0], this.allInputs.holeSize, VSecs, MDs, this.allInputs.holeSize);
                    xMaxList.push(Math.max(...pipe[0].x));
                    yMaxList.push(Math.max(...pipe[1].x));
                    xMinList.push(Math.min(...pipe[0].x));
                    yMinList.push(Math.min(...pipe[1].x));
                    pipes.push(new CustomPath(pipe[0].x, pipe[1].x, PipeTypes[j]));
                    xMaxList.push(Math.max(...pipe[2].x));
                    yMaxList.push(Math.max(...pipe[3].x));
                    xMinList.push(Math.min(...pipe[2].x));
                    yMinList.push(Math.min(...pipe[3].x));
                    pipes.push(new CustomPath(pipe[2].x, pipe[3].x, PipeTypes[j]));
                    xMaxList.push(Math.max(...pipe[4].x));
                    yMaxList.push(Math.max(...pipe[5].x));
                    xMinList.push(Math.min(...pipe[4].x));
                    yMinList.push(Math.min(...pipe[5].x));
                    pipes.push(new CustomPath(pipe[4].x, pipe[5].x, PipeTypes[j]));
                }
                    
            }

            

            

            if (PipeTypes[j] == "Tubing")
            {
                for (i = 1; i < tubingCounter; i++)
                {
                    if (pipeMDs[i] <= this.allInputs.terminalMD)
                    {
                        pipe = this.Draw_Tubing(pipeMDs[i - 1], pipeMDs[i], this.allInputs.pipeSize, VSecs, MDs, this.allInputs.holeSize);
                        xMaxList.push(Math.max(...pipe[0].x));
                        yMaxList.push(Math.max(...pipe[1].x));
                        xMinList.push(Math.min(...pipe[0].x));
                        yMinList.push(Math.min(...pipe[1].x));
                        pipes.push(new CustomPath(pipe[0].x, pipe[1].x, PipeTypes[j]));
                    }
                }
            }
            else
            {
                for (i = 1; i < holeCounter; i++)
                {
                    if (holeMDs[i] <= this.allInputs.terminalMD)
                    {
                        pipe = this.Draw_Tubing(holeMDs[i - 1], holeMDs[i], this.allInputs.holeSize, VSecs, MDs, this.allInputs.holeSize);
                        xMaxList.push(Math.max(...pipe[6].x));
                        yMaxList.push(Math.max(...pipe[7].x));
                        xMinList.push(Math.min(...pipe[6].x));
                        yMinList.push(Math.min(...pipe[7].x));
                        pipes.push(new CustomPath(pipe[6].x, pipe[7].x, PipeTypes[j]));
                    }
                }
            }

        }

        mDMin = Math.min(...yMinList);
        mDMax = Math.max(...yMaxList);
        vSecsMin = Math.min(...xMinList);
        vSecsMax = Math.max(...xMaxList);

        

        nRows = pipes.length;
        for (i = 0; i < nRows; i++)
        {
            pipes[i].CreatePath(this.allInputs.minXValue, this.allInputs.maxXValue,
            this.allInputs.minYValue, this.allInputs.maxYValue, vSecsMax, mDMax, vSecsMin, mDMin);
        }


        xMaxList = [];
        yMaxList = [];

        for (i = 0; i < nRows; i++)
        {
            xMaxList.push(Math.max(...pipes[i].xPath_Drawing));
            yMaxList.push(Math.max(...pipes[i].yPath_Drawing));
        }

        schematicDTO.xMax = Math.max(...xMaxList);
        schematicDTO.yMax = Math.max(...yMaxList);
        schematicDTO.pipes = pipes;

        return schematicDTO;
    }

    public static  GetPipesMDs(pipes:BasePipeModel[]):number[]
    {
        let i:number = 0; const nCount:number = pipes.length;
        let MDs:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            MDs.push(pipes[i].measuredDepth);
        }

        return MDs;
    }

    public static GetHolesMDs(holeSections:BaseHoleSectionModel[]):number[]
    {
        let i:number = 0; const nCount:number = holeSections.length;
        let MDs:number[] = [];
        for (i = 0; i < nCount; i++)
        {
            MDs.push(holeSections[i].bottomOfHole);
        }

        return MDs;
    }

    //List<List<double>>
    private static  Draw_Tubing(topMD:number, bottomMD:number, pipeSize:number,
        VSecs:number[], MDs:number[], holeSize:number):Piping[]
    {

        let leftPerpendicularLine:number[], rightPerpendicularLine:number[];
        let leftParallelLine:number[], rightParallelLine:number[];
        let leftPerpendicularLines:Piping[], rightPerpendicularLines:Piping[];
        let leftParallelLines:Piping[], rightParallelLines:Piping[];
        let pipe:Piping[];
        let midPerpendicularLine:number[], shoePerpendicularLine:number[];
        let midPerpendicularLines:Piping[];
        let xCasigShoeLeftPath:number[], yCasigShoeLeftPath:number[];
        let xCasigShoeRightPath:number[], yCasigShoeRightPath:number[];
        let xOpenHolePath:number[], yOpenHolePath:number[];

        
        let x1:number, x2:number, nSegments:number;
        let y1:number, y2:number, i:number;
        let dx:number, dy:number, pipeVSecs:number[];
        let distance:number, pipeMDs:number[], j:number;
        let size1:number, size2:number, xMid:number, yMid:number;
        let xPath:number[], yPath:number[];
        nSegments = 20;
        const shoeSize:number = (2 * (pipeSize / 5)) + pipeSize;
        pipeMDs = Spacing.LineSpace(topMD, bottomMD, nSegments);
        pipeVSecs = [];
        xPath = [];
        yPath = [];
        xOpenHolePath = [];
        yOpenHolePath = [];

        leftPerpendicularLines = [];
        rightPerpendicularLines = [];
        leftParallelLines = [];
        rightParallelLines = [];
        midPerpendicularLines = [];
        pipe = [];

        xCasigShoeLeftPath = [];
        yCasigShoeLeftPath = [];
        xCasigShoeRightPath = [];
        yCasigShoeRightPath = [];


        for (i = 0; i < nSegments; i++)
        {
            pipeVSecs.push(Interpolation.LinearInterpolation(MDs, VSecs, pipeMDs[i]));

        }


        for (i = 1; i < nSegments; i++)
        {
            x1 = pipeVSecs[i - 1];
            y1 = pipeMDs[i - 1];
            x2 = pipeVSecs[i];
            y2 = pipeMDs[i];
            dx = this.Get_DX1(x1, x2);
            dy = this.Get_DY1(y1, y2);
            distance = this.Get_Distance(dx, dy);
            dx = this.Get_DX2(dx, distance);
            dy = this.Get_DY2(dy, distance);
            leftPerpendicularLine = this.Draw_A_Perpendicular_Line(x1, y1, pipeSize, dx, dy);
            rightPerpendicularLine = this.Draw_A_Perpendicular_Line(x2, y2, pipeSize, dx, dy);

            yMid = (y1 + y2) / 2;
            xMid = Interpolation.LinearInterpolation(MDs, VSecs, yMid);
            dx = this.Get_DX1(x1, xMid);
            dy = this.Get_DY1(y1, yMid);
            distance = this.Get_Distance(dx, dy);
            dx = this.Get_DX2(dx, distance);
            dy = this.Get_DY2(dy, distance);
            midPerpendicularLine = this.Draw_A_Perpendicular_Line(xMid, yMid, shoeSize, dx, dy);

            leftParallelLine = [];
            rightParallelLine = [];


            leftParallelLine.push(leftPerpendicularLine[0]);
            leftParallelLine.push(leftPerpendicularLine[1]);
            leftParallelLine.push(rightPerpendicularLine[0]);
            leftParallelLine.push(rightPerpendicularLine[1]);

            rightParallelLine.push(leftPerpendicularLine[2]);
            rightParallelLine.push(leftPerpendicularLine[3]);
            rightParallelLine.push(rightPerpendicularLine[2]);
            rightParallelLine.push(rightPerpendicularLine[3]);

            leftPerpendicularLines.push(new Piping(leftPerpendicularLine));
            rightPerpendicularLines.push(new Piping(rightPerpendicularLine));
            leftParallelLines.push(new Piping(leftParallelLine));
            rightParallelLines.push(new Piping(rightParallelLine));
            midPerpendicularLines.push(new Piping(midPerpendicularLine));

            //Get Casing Shoe Perpendicular Line
            if (i == nSegments - 1) {
                shoePerpendicularLine = this.Draw_A_Perpendicular_Line(x2, y2, shoeSize, dx, dy);

                xCasigShoeLeftPath.push(rightParallelLine[0]);
                yCasigShoeLeftPath.push(rightParallelLine[1]);
                xCasigShoeLeftPath.push(rightParallelLine[2]);
                yCasigShoeLeftPath.push(rightParallelLine[3]);
                xCasigShoeLeftPath.push(shoePerpendicularLine[2]);
                yCasigShoeLeftPath.push(shoePerpendicularLine[3]);
                xCasigShoeLeftPath.push(rightParallelLine[0]);
                yCasigShoeLeftPath.push(rightParallelLine[1]);


                xCasigShoeRightPath.push(leftParallelLine[0]);
                yCasigShoeRightPath.push(leftParallelLine[1]);
                xCasigShoeRightPath.push(leftParallelLine[2]);
                yCasigShoeRightPath.push(leftParallelLine[3]);
                xCasigShoeRightPath.push(shoePerpendicularLine[0]);
                yCasigShoeRightPath.push(shoePerpendicularLine[1]);
                xCasigShoeRightPath.push(leftParallelLine[0]);
                yCasigShoeRightPath.push(leftParallelLine[1]);
    

    }
    /////////////////////////////////////////////////////////////////

        }

        leftPerpendicularLine = leftPerpendicularLines[0].x;
        xPath.push(leftPerpendicularLine[0]);
        yPath.push(leftPerpendicularLine[1]);
        xPath.push(leftPerpendicularLine[2]);
        yPath.push(leftPerpendicularLine[3]);

        xOpenHolePath.push(leftPerpendicularLine[0]);
        yOpenHolePath.push(leftPerpendicularLine[1]);
        xOpenHolePath.push(leftPerpendicularLine[2]);
        yOpenHolePath.push(leftPerpendicularLine[3]);

        for (i = 0; i < nSegments - 1; i++)
        {
            leftParallelLine = leftParallelLines[i].x;
            midPerpendicularLine = midPerpendicularLines[i].x;
            xPath.push(leftParallelLine[0]);
            yPath.push(leftParallelLine[1]);
            xOpenHolePath.push(leftParallelLine[0]);
            yOpenHolePath.push(leftParallelLine[1]);

            xOpenHolePath.push(midPerpendicularLine[0]);
            yOpenHolePath.push(midPerpendicularLine[1]);


            xPath.push(leftParallelLine[2]);
            yPath.push(leftParallelLine[3]);
            xOpenHolePath.push(leftParallelLine[2]);
            yOpenHolePath.push(leftParallelLine[3]);

        }

        rightPerpendicularLine = rightPerpendicularLines[nSegments - 2].x;
        xPath.push(rightPerpendicularLine[2]);
        yPath.push(rightPerpendicularLine[3]);
        xOpenHolePath.push(rightPerpendicularLine[2]);
        yOpenHolePath.push(rightPerpendicularLine[3]);


        xPath.push(rightPerpendicularLine[0]);
        yPath.push(rightPerpendicularLine[1]);
        xOpenHolePath.push(rightPerpendicularLine[0]);
        yOpenHolePath.push(rightPerpendicularLine[1]);

        for (i = nSegments - 2; i >= 0; i--)
        {
            rightParallelLine = rightParallelLines[i].x;
            midPerpendicularLine = midPerpendicularLines[i].x;
            xPath.push(rightParallelLine[2]);
            yPath.push(rightParallelLine[3]);
            xOpenHolePath.push(rightParallelLine[2]);
            yOpenHolePath.push(rightParallelLine[3]);

            xOpenHolePath.push(midPerpendicularLine[2]);
            yOpenHolePath.push(midPerpendicularLine[3]);

            xPath.push(rightParallelLine[0]);
            yPath.push(rightParallelLine[1]);
            xOpenHolePath.push(rightParallelLine[0]);
            yOpenHolePath.push(rightParallelLine[1]);
        }

        pipe.push(new Piping(xPath));
        pipe.push(new Piping(yPath));
        pipe.push(new Piping(xCasigShoeLeftPath));
        pipe.push(new Piping(yCasigShoeLeftPath));
        pipe.push(new Piping(xCasigShoeRightPath));
        pipe.push(new Piping(yCasigShoeRightPath));
        pipe.push(new Piping(xOpenHolePath));
        pipe.push(new Piping(yOpenHolePath));


        return pipe;


    }


    private static  Draw_A_Perpendicular_Line(X:number, Y:number,
        pipeSize:number, dx:number, dy:number):number[]
    {
        let x1:number, x2:number, y1:number, y2:number;
        let collect:number[] = [];
        x1 = X + (pipeSize / 2) * dy;
        x2 = X - (pipeSize / 2) * dy;

        y1 = Y - (pipeSize / 2) * dx;
        y2 = Y + (pipeSize / 2) * dx;

        collect.push(x1);
        collect.push(y1);
        collect.push(x2);
        collect.push(y2);

        return collect;

    }


    private static Get_DX1(x1:number, x2:number):number
    {
        const dx:number = x1 - x2;
        return dx;
    }

    private static Get_DY1(y1:number, y2:number):number
    {
        const dy:number = y1 - y2;
        return dy;
    }

    private static Get_Distance(dx:number, dy:number):number
    {
        const distance:number = Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5);
        return distance;
    }

    private static Get_DX2(dx:number, distance:number):number
    {
        const dx_:number = dx / distance;
        return dx_;
    }

    private static Get_DY2(dy:number, distance:number):number
    {
        const dy_:number = dy / distance;
        return dy_;
    }


    private static ReScaleDimension(minValue:number, maxValue:number, knownValues:number[]):number[]
    {
        const knownMax:number = Math.max(...knownValues);
        const knownMin:number = 0;// knownValues.Min();
        let i:number = 0; const nRows:number = knownValues.length;
        let xValues:number[] = [];

        for (i = 0; i < nRows; i++)
        {
            xValues.push(this.ReScaleDimension2(minValue, maxValue, knownMin, knownMax, knownValues[i]));
        }

        return xValues;
    }
    private static ReScaleDimension2(xMin:number, xMax:number, knownMin:number,
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