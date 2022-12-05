export const Torque = {
    TorqueIncrement(normalForce:number, frictionFactor:number, outerRadius:number,
                    trippingSpeed:number, rPM:number, ratio:number, isBackReaming:boolean = false):number{
        let torqueIncrement:number = 0;
        const v_alpha:number = trippingSpeed * 12.0 / 60.0; //in/sec
        let omega:number = 0, vr:number = 0;
        omega = (outerRadius*2) * Math.PI * rPM / 60.0; // in/sec
        vr = Math.pow(Math.pow(v_alpha, 2.0) + Math.pow(omega, 2.0), 0.5);

        if (ratio != 1)
            ratio = Math.abs(v_alpha) / Math.abs(vr);
        torqueIncrement = normalForce * frictionFactor * (outerRadius / 12.0) * ratio;
        //if (isBackReaming == true)
        //{
        //    vr = Math.Pow(Math.Pow(v_alpha, 2.0) - Math.Pow(omega, 2.0), 0.5);
        //    ratio = Math.Abs(omega) / Math.Abs(vr);
        //    torqueIncrement = normalForce * frictionFactor * (outerRadius / 12.0) * ratio;

        //}

        return torqueIncrement;
    },

    TotalTorque(torqueIncrements:number[]):number{
        const torqueIncrementsCount:number = torqueIncrements.length;
        let i:number = 0, totalTorque:number = 0;

        for (i = 0; i < torqueIncrementsCount; i++)
        {
            totalTorque = totalTorque + torqueIncrements[i];
        }

        return totalTorque;
    }
}