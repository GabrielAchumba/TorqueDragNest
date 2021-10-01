import { randomUUID } from "crypto";

export class PipeSegment {

    /*constructor(_pipe:Pipe, _widthRatio:number, _heightRatio:number,
                        _xCanvasOffset:number, _yCanvasOffset:number)
    {
        this.widthRatio = _widthRatio;
        this.heightRatio = _heightRatio;
        this.pipe = _pipe;
        this.xCanvasOffset = _xCanvasOffset;
        this.yCanvasOffset = _yCanvasOffset;
    }

     constructor( _pipes, double _widthRatio, double _heightRatio,
                        int _xCanvasOffset, int _yCanvasOffset)
    {
        this.widthRatio = _widthRatio;
        this.heightRatio = _heightRatio;
        this.pipes = new List<Pipe>(_pipes);
        this.xCanvasOffset = _xCanvasOffset;
        this.yCanvasOffset = _yCanvasOffset;
    } */

    xCanvasOffset:number;
    yCanvasOffset:number;
    widthRatio:number;
    heightRatio:number
    /* pipe:Pipe;
    pipes:Pipe[];
    holeSection:BaseHoleSectionModel
    holeSectionNew:HoleSection
    public Point point1 { get; set; }
    public Point point2 { get; set; }
    public Point point3 { get; set; }
    public Point point4 { get; set; }
    public Point pointLast { get; set; } */
    clearance:number; // (outer diametr - inner diameter)/ 2 = stroke-width
    fill:string; // color of the fill
    stroke:string; //Color of the stroke
    strokeWidth:string; //Color of the stroke
    d:string;
    space:string;
    id:string;
    reduction:number = 0;

    xMax:number;
    yMax:number;
    StartDepthIndex:number;
    StartTVD:number;
}