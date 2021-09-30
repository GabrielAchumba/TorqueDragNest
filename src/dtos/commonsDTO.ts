import { Common } from "src/models/common";
import { CommonDTO } from "./commonDTO";

export class CommonsDTO extends CommonDTO
{
    userId:string;
    common:Common;
    canvasDepth:number;
    canvasWidth:number;
    xCanvasOffset:string;

}
  