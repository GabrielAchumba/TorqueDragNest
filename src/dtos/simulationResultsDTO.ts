import { BaseOperationResult, OperationResult } from "../models/operationResult";

export class SimulationResultsDTO
{
    constructor()
    {
        this.trippingInResults = [];
        this.trippingOutResults = [];
        this.drillingResults = [];
        this.slideDrillingResults = [];
        this.backReamingResults = [];
        this.rotatingOffBottomResults = [];
        this.isTrippingInChecked = false;
        this.isTrippingOutChecked = false;
        this.isRotatingOnBottomChecked = false;
        this.isSlideDrillingChecked = false;
        this.isBackReamingChecked = false;
    }
    trippingInResults:OperationResult[];
    trippingOutResults :OperationResult[];
    drillingResults :OperationResult[];
    rotatingOffBottomResults :OperationResult[];
    slideDrillingResults :OperationResult[];
    backReamingResults :OperationResult[];
    hydraulicsResults :BaseOperationResult[];
    surgeSwabResults :BaseOperationResult[];
    isTrippingInChecked :boolean
    isTrippingOutChecked :boolean
    isRotatingOnBottomChecked :boolean
    isSlideDrillingChecked :boolean
    isBackReamingChecked :boolean
    isRotatingOffBottomChecked :boolean
}