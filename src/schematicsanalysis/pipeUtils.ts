import { Interpolation } from "src/mathematics/interpolation";
import { Sorting } from "src/mathematics/sorting";
import { Spacing } from "src/mathematics/spacing";
import { BasePipeModel, Pipe } from "src/models/basepipe";
import { Common } from "src/models/common";

export class PipeUtils {

    static GetPipeDecrementsNew(pipes:BasePipeModel[], common:Common,
        DevSurveyMDs:number[], DevSurveyInclinations:number[], DevSurveyAzimuths:number[],
        DevSurveyTVDs:number[], DevSurveyVerticalSections:number[], DevSurveyDogLegs:number[],
        LastMDHole:number,
        isDrawing:boolean = false):any
    {

        let _pipes:Pipe[] = [];
        let _isJoints:boolean[] = [];
        let i:number = 0, startMD:number = 0, endMD:number = 0, stepSize:number = 0;

        startMD = common.startMeasuredDepth;
        endMD = common.endMeasuredDepth;
        stepSize = common.stepSize;

        if (startMD > LastMDHole)
            startMD = LastMDHole;

        if (endMD > LastMDHole)
            endMD = LastMDHole;

        if (isDrawing == true)
        {
            startMD = 0;
            stepSize = 50;
            endMD = LastMDHole;
        }

        let currentMD:number = endMD;

        let  tempPipeMDs:number[] = Spacing.LineSpaceReverse(0, pipes[0].measuredDepth, stepSize);
        const nCount:number = tempPipeMDs.length;
        for (i = 0; i < nCount-1; i++)
        {
            const startMeasuredDepth:number = tempPipeMDs[i+1];
            const measuredDepth:number = tempPipeMDs[i];
            const step:number = measuredDepth - startMeasuredDepth;
            const midMD:number = (startMeasuredDepth + measuredDepth) / 2.0;
            const pipe:BasePipeModel = PipeUtils.GetPipe2(midMD, pipes);
            const onePipeSection:Pipe = new Pipe();
            onePipeSection.typeOfSection = pipe.typeOfSection;
            onePipeSection.length = step;
            onePipeSection.startMeasuredDepth = startMeasuredDepth;
            onePipeSection.measuredDepth = measuredDepth;
            onePipeSection.size = pipe.size;
            onePipeSection.weight = pipe.weight;
            onePipeSection.grade = pipe.grade;
            onePipeSection.outerDiameter = pipe.outerDiameter;
            onePipeSection.innerDiameter = pipe.innerDiameter;
            onePipeSection.minimumYieldStrength = pipe.minimumYieldStrength;
            onePipeSection.itemDescription = pipe.itemDescription;
            onePipeSection.makeUpTorque = pipe.makeUpTorque;
            onePipeSection.overPullMargin = pipe.overPullMargin;

            _pipes.push(onePipeSection);

            _isJoints.push(false);

        }


        const pipe0:BasePipeModel = PipeUtils.GetPipe2(0, pipes);
        const oneSeg:Pipe = new Pipe();
        oneSeg.typeOfSection = pipe0.typeOfSection;
        oneSeg.length = 0;
        oneSeg.startMeasuredDepth = 0;
        oneSeg.measuredDepth = 0;
        oneSeg.size = pipe0.size;
        oneSeg.weight = pipe0.weight;
        oneSeg.grade = pipe0.grade;
        oneSeg.outerDiameter = pipe0.outerDiameter;
        oneSeg.innerDiameter = pipe0.innerDiameter;
        oneSeg.minimumYieldStrength = pipe0.minimumYieldStrength;
        oneSeg.itemDescription = pipe0.itemDescription;
        oneSeg.makeUpTorque = pipe0.makeUpTorque;
        oneSeg.overPullMargin = pipe0.overPullMargin;

        _pipes.push(oneSeg);

        _isJoints.push(false);

        _pipes = Sorting.SortListofPipe(_pipes);
        _pipes = PipeUtils.RecalculatePipeLength(_pipes, DevSurveyMDs, DevSurveyInclinations, DevSurveyAzimuths,
                                DevSurveyTVDs, DevSurveyVerticalSections, DevSurveyDogLegs);

        return {_pipes, _isJoints};
    }

    static GetPipeDecrements(pipes:BasePipeModel[], common:Common,
        DevSurveyMDs:number[], DevSurveyInclinations:number[], DevSurveyAzimuths:number[],
        DevSurveyTVDs:number[], DevSurveyVerticalSections:number[], DevSurveyDogLegs:number[],
        LastMDHole:number,
        isDrawing:boolean = false):any
    {

        let _pipes:Pipe[] = [];
        let _isJoints:boolean[] = [];
        const pipesLength:number = pipes.length;
        let i:number = 0, startMD:number = 0, endMD:number = 0, stepSize:number = 0;

        startMD = common.startMeasuredDepth;
        endMD = common.endMeasuredDepth;
        stepSize = common.stepSize;

        if (startMD > LastMDHole)
            startMD = LastMDHole;

        if (endMD > LastMDHole)
            endMD = LastMDHole;

        if (isDrawing == true)
        {
            startMD = 0;
            stepSize = 50;
            endMD = LastMDHole;
        }

        let currentMD:number = endMD;


        let tempPipeMDs:number[] = null;
        for (i = 0; i < pipesLength; i++)
        {
            const pipe:BasePipeModel = pipes[i]

            if(pipe.length <= stepSize)
            {
                const pipeSeg = new Pipe();
                pipeSeg.typeOfSection = pipe.typeOfSection;
                pipeSeg.length = pipe.length;
                pipeSeg.startMeasuredDepth = pipe.measuredDepth - pipe.length;
                pipeSeg.measuredDepth = pipe.measuredDepth;
                pipeSeg.size = pipe.size;
                pipeSeg.weight = pipe.weight;
                pipeSeg.grade = pipe.grade;
                pipeSeg.outerDiameter = pipe.outerDiameter;
                pipeSeg.innerDiameter = pipe.innerDiameter;
                pipeSeg.minimumYieldStrength = pipe.minimumYieldStrength;
                pipeSeg.itemDescription = pipe.itemDescription;
                pipeSeg.makeUpTorque = pipe.makeUpTorque;
                pipeSeg.overPullMargin = pipe.overPullMargin;

                _pipes.push(pipeSeg);
            }
            else
            {
                tempPipeMDs = Spacing.LineSpaceReverse(pipe.measuredDepth - pipe.length, pipe.measuredDepth, stepSize);
                const count:number = tempPipeMDs.length;
                for (i = 0; i < count - 1; i++)
                {
                    let step:number = stepSize;
                    if (i > 0)
                        step = tempPipeMDs[i] - tempPipeMDs[i + 1];
                    const pipeSeg:Pipe = new Pipe();
                    pipeSeg.typeOfSection = pipe.typeOfSection;
                    pipeSeg.length = step;
                    pipeSeg.startMeasuredDepth = tempPipeMDs[i] - step;
                    pipeSeg.measuredDepth = tempPipeMDs[i];
                    pipeSeg.size = pipe.size;
                    pipeSeg.weight = pipe.weight;
                    pipeSeg.grade = pipe.grade;
                    pipeSeg.outerDiameter = pipe.outerDiameter;
                    pipeSeg.innerDiameter = pipe.innerDiameter;
                    pipeSeg.minimumYieldStrength = pipe.minimumYieldStrength;
                    pipeSeg.itemDescription = pipe.itemDescription;
                    pipeSeg.makeUpTorque = pipe.makeUpTorque;
                    pipeSeg.overPullMargin = pipe.overPullMargin;

                    _pipes.push(pipeSeg);
                    _isJoints.push(false);
                }
            }


        }


        _pipes = Sorting.SortListofPipe(_pipes);
        _pipes = PipeUtils.RecalculatePipeLength(_pipes, DevSurveyMDs, DevSurveyInclinations, DevSurveyAzimuths,
                                DevSurveyTVDs, DevSurveyVerticalSections, DevSurveyDogLegs);

        return { _pipes, _isJoints };
    }


    private static GetPipe2(currentMD:number, pipes:BasePipeModel[]):BasePipeModel
    {
        let pipe:BasePipeModel = null;
        const nCount = pipes.length; let i: number = 0;


        for (i = 0; i < nCount; i++)
        {

            if (currentMD >= (pipes[i].measuredDepth - pipes[i].length) && currentMD <= pipes[i].measuredDepth)
            {
                pipe = pipes[i];
                break;
            }
        }



        return pipe;
    }


    public static RecalculatePipeLength(pipes:Pipe[], DevSurveyMDs:number[],
        DevSurveyInclinations:number[], DevSurveyAzimuths:number[],
        DevSurveyTVDs:number[], DevSurveyVerticalSections:number[],
        DevSurveyDogLegs:number[],
        pipeIndex:number = 0, bottomTVDPreviousPipe:number = 0,
        bottomDisplacementPreviousPipe:number = 0, bottomOD:number = 0):Pipe[]
    {
        let i = 0; const nCount = pipes.length;
        let _pipes = pipes.map(( row:Pipe ) => {
            return row;
        });

        const pi:number = Math.PI;

        for (i = 0; i < nCount; i++)
        {


            _pipes[i].topInclination = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyInclinations, _pipes[i].measuredDepth - _pipes[i].length);
            _pipes[i].bottomInclination = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyInclinations, _pipes[i].measuredDepth);
            _pipes[i].topAzimuth = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyAzimuths, _pipes[i].measuredDepth - _pipes[i].length);
            _pipes[i].bottomAzimuth = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyAzimuths, _pipes[i].measuredDepth);
            _pipes[i].dogleg = 0;
            if (DevSurveyDogLegs.length > 0)
                _pipes[i].dogleg = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyDogLegs, _pipes[i].measuredDepth - _pipes[i].length);
            _pipes[i].averageInclination = (((_pipes[i].topInclination * 180.0 / pi) + (_pipes[i].bottomInclination * 180.0 / pi)) / 2.0) * pi / 180.0;
            _pipes[i].averageAzimuth = (((_pipes[i].topAzimuth * 180.0 / pi) + (_pipes[i].bottomAzimuth * 180.0 / pi)) / 2.0) * pi / 180.0;
            const horizontalDisplacementTop:number = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyVerticalSections, _pipes[i].measuredDepth - _pipes[i].length);
            const horizontalDisplacement:number = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyVerticalSections, _pipes[i].measuredDepth);
            const trueVerticalDepthTop:number = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyTVDs, _pipes[i].measuredDepth - _pipes[i].length);
            const trueVerticalDepth:number = Interpolation.LinearInterpolation(DevSurveyMDs, DevSurveyTVDs, _pipes[i].measuredDepth);
            if (i == 0)
            {
                if (pipeIndex == 0)
                {
                    _pipes[i].topTrueVerticalDepth = trueVerticalDepthTop;
                    _pipes[i].bottomTrueVerticalDepth = trueVerticalDepth;
                    _pipes[i].topDisplacement = horizontalDisplacementTop;
                    _pipes[i].bottomDisplacement = horizontalDisplacement;
                    _pipes[i].topOuterDaimeter = _pipes[i].outerDiameter;
                }
                else
                {
                    _pipes[i].topTrueVerticalDepth = bottomTVDPreviousPipe;
                    _pipes[i].bottomTrueVerticalDepth = trueVerticalDepth;
                    _pipes[i].topDisplacement = bottomDisplacementPreviousPipe;
                    _pipes[i].bottomDisplacement = horizontalDisplacement;
                    _pipes[i].topOuterDaimeter = bottomOD;
                }



            }
            else
            {
                _pipes[i].topTrueVerticalDepth = _pipes[i - 1].bottomTrueVerticalDepth;
                _pipes[i].bottomTrueVerticalDepth = trueVerticalDepth;
                _pipes[i].topDisplacement = _pipes[i - 1].bottomDisplacement;
                _pipes[i].bottomDisplacement = horizontalDisplacement;
                _pipes[i].topOuterDaimeter = _pipes[i].outerDiameter;
            }

        }

        return _pipes;
    }


}