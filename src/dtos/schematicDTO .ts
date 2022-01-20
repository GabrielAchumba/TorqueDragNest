import { ParseUUIDPipe } from "@nestjs/common";;
import { CommonDTO } from "./commonDTO";
import { CustomPath , ICustomPath} from "./CustomPath"

export class SchematicDTO extends CommonDTO
{
     //"watch": ["src"],
    //"ext": "ts",
    //"ignore": ["src/**/*.spec.ts"],
    //"exec": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register src/main.ts "

    
    //holeSegments:HoleSegment[];
    //pipeSegments:PipeSegment[];
    xList:number[] = [];
    yList:number[] = [];
    xMax:number;
    yMax:number;
    pipes:ICustomPath[];
}



