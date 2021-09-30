import { BaseOperationResult, OperationResult } from "src/models/operationResult";

export class SimulationResultsDTO
{
    constructor()
    {
        this.trippingInResults = [];
        this.trippingOutResults = [];
        this.DrillingResults = [];
        this.SlideDrillingResults = [];
        this.BackReamingResults = [];
        this.rotatingOffBottomResults = [];
        this.isTrippingInChecked = false;
        this.isTrippingOutChecked = false;
        this.isRotatingOnBottomChecked = false;
        this.isSlideDrillingChecked = false;
        this.isBackReamingChecked = false;
    }
    trippingInResults:OperationResult[];
    trippingOutResults :OperationResult[];
    DrillingResults :OperationResult[];
    rotatingOffBottomResults :OperationResult[];
    SlideDrillingResults :OperationResult[];
    BackReamingResults :OperationResult[];
    hydraulicsResults :BaseOperationResult[];
    surgeSwabResults :BaseOperationResult[];
    isTrippingInChecked :boolean
    isTrippingOutChecked :boolean
    isRotatingOnBottomChecked :boolean
    isSlideDrillingChecked :boolean
    isBackReamingChecked :boolean
    isRotatingOffBottomChecked :boolean
}