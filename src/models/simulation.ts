import * as mongoose from 'mongoose';
import { BaseHoleSectionModel } from './baseholesection';

export class SimulationModel {
    typeOfSection: string;
    topMeasuredDepth: number;
    bottomMeasuredDepth: number;
    length: number;
    pipeUnitWeight: number;
    pipeTotalWeight: number;
    buoyancyFactor: number;
    buoyancyWeight: number;
    tensileStrength: number;
    topInclination: number;
    bottomInclination: number;
    topAzimuth: number;
    bottomAzimuth: number;
    dogLegSeverity: number;
    sideForce: number;
    momentOfInertia: number;
    radialClearance: number;
    holeSection: BaseHoleSectionModel;
    buckling: number;
    torque: number;
    totalTorque: number;
    normalForce: number;
    dragForce: number;
    totalDrag: number;
    trippingInTensionIncrement: number;
    trippingOutTensionIncrement: number;
    tensionTopOfPipeTripIn: number;
    tensionTopOfPipeTripOut: number;
    trippinInHookeLoadAtJoint: number;
    trippinOutHookeLoadAtJoint: number;
    hookeLoadBitToSurfaceTripIn: number;
    hookeLoadBitToSurfaceTripOut: number;
    tripInRotationalSpeed: number;
    tripOutRotationalSpeed: number;
    tripInRotationFrictionDrag: number;
    tripOutRotationFrictionDrag: number;
    totalTripInRotationFrictionDrag: number;
    totalTripOutRotationFrictionDrag: number;
    tripInRotationTension: number;
    tripOutRotationTension: number;
    totalTripInRotationTension: number;
    totalTripOutRotationTension: number;

}

export class Simulation {
    designId: string;
    userId: string;
    simulations: SimulationModel[];
  }


export interface SimulationDocument extends mongoose.Document, Simulation { }


