export const Inertia_Clearance = {
    MomentOfInertia(outerDiameter:number, innerDiameter:number,
                    jointOuterDiameter:number = 0, jointInnerDiameter:number = 0,
                    isJoint:boolean = false):number{
        let momentOfInertia_b:number = 0;
        momentOfInertia_b = (Math.PI / 64.0) * (Math.pow(outerDiameter, 4.0) - Math.pow(innerDiameter, 4.0));

        if (isJoint == true)
        {
            var momentOfInertia_j = (Math.PI / 64.0) * (Math.pow(jointOuterDiameter, 4.0) - Math.pow(jointInnerDiameter, 4.0));
            momentOfInertia_b = momentOfInertia_b * momentOfInertia_j / (0.05 * momentOfInertia_b + 0.95 * momentOfInertia_j);
        }

        return momentOfInertia_b;
    },

    PolarMomentOfInertia(outerDiameter:number, innerDiameter:number,
        jointOuterDiameter:number = 0, jointInnerDiameter:number = 0, isJoint:boolean = false):number{
        let momentOfInertia_b:number = 0;
        momentOfInertia_b = (Math.PI / 32.0) * (Math.pow(outerDiameter, 4.0) - Math.pow(innerDiameter, 4.0));
        if (isJoint == true)
        {
            var momentOfInertia_j = (Math.PI / 32.0) * (Math.pow(jointOuterDiameter, 4.0) - Math.pow(jointInnerDiameter, 4.0));
            momentOfInertia_b = momentOfInertia_b * momentOfInertia_j / (0.05 * momentOfInertia_b + 0.95 * momentOfInertia_j);
        }
        return momentOfInertia_b;
    },

    RadialClearance(holeDiameter:number, pipeOuterDiameter:number,
                        jointDiameter:number = 0, isJoint:boolean = false):number{
        let radialClearance:number = 0;
        radialClearance = (0.5) * (holeDiameter - pipeOuterDiameter);

        if (isJoint == true)
        {
            const rclj:number = 0.5 * (holeDiameter - jointDiameter);
            radialClearance = 0.95 * radialClearance + 0.05 * rclj;

        }

        return radialClearance;
    }
}