export class Drag
{
    public static NormalForce(effectiveAxialForce:number, inclination:number,
                    deltaAzimuth:number, buoyancyWeightOfDrillStringElement:number, 
                    deltaInclination:number):number
    {

        let normalForce:number = 0, term1:number = 0, term2:number = 0;
        term1 = Math.pow(effectiveAxialForce * deltaAzimuth * Math.sin(inclination), 2.0);
        term2 = Math.pow(effectiveAxialForce * deltaInclination
            + buoyancyWeightOfDrillStringElement * Math.sin(inclination), 2.0);
        normalForce = Math.sqrt(term1 + term2);
        return normalForce;

    }

    public static DragForce(normalForce:number,
                          wellCoefficientOfFriction:number,
                    trippingSpeed:number, rPM:number, pipeOuterDiameter:number, 
                    ratio:number = 1.0):number
    {
        let dragForce:number = 0;
        let v_alpha:number = trippingSpeed * 12.0 / 60.0; //in/sec
        let omega:number = 0, vr:number = 0;
        omega = pipeOuterDiameter * Math.PI * rPM / 60.0; // in/sec
        vr = Math.pow(Math.pow(v_alpha, 2.0) + Math.pow(omega, 2.0), 0.5);

        if (ratio != 1)
            ratio = Math.abs(v_alpha) / Math.abs(vr);
        dragForce = wellCoefficientOfFriction * normalForce * ratio;
        return dragForce;

    }

    public static TotalDrag(fns:number[]):number
    {
        let totalDrag:number = 0;
        let i:number = 0; const n:number = fns.length;
        for (i = 0; i < n; i++)
        {
            totalDrag = totalDrag + (fns[i]);
        }

        return totalDrag;
    }

    public static TrippingInTensionIncrement(weightOfDrillStringElement:number, inclination:number,
                    wellCoefficientOfFriction:number, normalForce:number):number
    {
        const trippingInTensionIncrement:number 
        = weightOfDrillStringElement * Math.cos(inclination) - wellCoefficientOfFriction 
        * normalForce;
        return trippingInTensionIncrement;
    }

    public static TrippingOutTensionIncrement(weightOfDrillStringElement:number, inclination:number,
                    wellCoefficientOfFriction:number, normalForce:number):number
    {
        const trippingOutTensionIncrement:number 
        = weightOfDrillStringElement * Math.cos(inclination) + wellCoefficientOfFriction 
        * normalForce;
        return trippingOutTensionIncrement;
    }

    public static TensionTopOfPipe(n:number, tensionIncrements:number[]):number
    {
        let i:number = 0, tensionTopOfPipe:number = 0;
        for (i = 0; i < n; i++)
        {
            tensionTopOfPipe = tensionTopOfPipe + tensionIncrements[i];
        }

        return tensionTopOfPipe;
    }

    public static TrippingInHookeLoadAtJoint(weightOfDrillStringElement:number, inclination:number,
                    dragForece:number):number
    {
        const trippinInHookeLoadAtJoint:number 
        = weightOfDrillStringElement * Math.cos(inclination) - dragForece;
        return trippinInHookeLoadAtJoint;
    }


    public static TrippingOutHookeLoadAtJoint(weightOfDrillStringElement:number, inclination:number,
                   dragForece:number):number
    {
        const trippinOutHookeLoadAtJoint:number 
        = weightOfDrillStringElement * Math.cos(inclination) + dragForece;
        return trippinOutHookeLoadAtJoint;
    }

    public static HookeLoadBitToSurface(nJoints:number, hookeLoads:number[]):number
    {
        let i:number = 0, hookeLoadBitToSurface:number = 0;
        for (i = 0; i < nJoints; i++)
        {
            hookeLoadBitToSurface = hookeLoadBitToSurface + hookeLoads[i];
        }

        return hookeLoadBitToSurface;
    }

}