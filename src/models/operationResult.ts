import { BaseHoleSectionModel } from "./baseholesection";

export interface BaseOperationResult
{
    dp:number;
    typeOfSection:string;
    topMeasuredDepth:number;
    bottomMeasuredDepth:number;
    topTrueVerticalDepth:number;
    bottomTrueVerticalDepth:number;
    length:number;
    pipeOuterArea:number;
    holeInnerArea:number;
    annularArea:number;
    pipeInnerArea:number;
    pipeOuterDiameter:number;
    crossSectionalArea:number;
    pipeInnerDiameter:number;
    pipeUnitWeight:number;
    pipeTotalWeight:number;
    buoyancyFactor:number;
    buoyancyWeight:number;
    yeildStrength:number;
    percentOfYield:number;
    tensileStrength:number;
    overPullMargin:number;
    topInclination:number;
    bottomInclination:number;
    topAzimuth:number;
    bottomAzimuth:number;
    dogLegSeverity:number;
    sideForce:number;
    momentOfInertia:number;
    polarMomentOfInertia:number;
    youngsModulus:number;
    radialClearance:number;
    holeSection :BaseHoleSectionModel;
     averageInclination :number;
     averageAzimuth:number; 
     criticalInclinationAngle:number; 
    section2D :string;
     criticalSinusoidalBuckling:number;
     criticalHelicalBuckling:number; 
     changeInInclination:number;
     changeInAzimuth:number; 
     mudDensityAnnulus :number;
     mudDensityInsidePipe :number;
     annulusHydrostaticPressure :number;
     insidePipeHydrostaticPressure :number;
     annulusHydrostaticPressureTop :number;
     insidePipeHydrostaticPressureTop :number;
     insidePipeHydrostaticChange :number;
     annulusHydrostaticChange :number;
     pipeBottomPressureForce :number;
     annulusBottomPressureForce :number;
     bucklingStabilityForce :number;
     effectiveTension :number;
     pressureLoss :number;
     fluidDragForce :number;
     shearRateInAnnulus :number;
     shearStress :number;
     torqueFromShearStress :number;
    annularFlowRegime :string;
    pipeFlowRegime :string;
     pipeReynoldsNumber :number;
     fluidViscosity :number;
     effectivePipeFluidViscosity :number;
     effectiveAnnulusFluidViscosity :number;
     pipeFluidVelocity :number;
     nozzleVelocity :number;
     pipeEffectiveFluidVelocity :number;
     clingingConstant :number;
     annulusReynoldsNumber :number;
     annulusFluidVelocity :number;
     annulusEffectiveFluidVelocity :number;
     pipeFrictionFactor:number;
     annulusFrictionFactor :number;
     pipePressureLoss :number;
     bitPowerOverArea :number;
     bitPressureLoss :number;
     bitPressureLoss2 :number;
     nozzleFlowArea :number;
     bitHydraulicPower :number;
     percentagebitHydraulicPower :number;
     parasticPressureLoss :number;
     bitImpactForce :number;
     annulusPressureLoss :number;
     surfacePressureLoss :number;
     equivalentCirculatingDensity :number;
     tripPerStand :number;
     eCDPipeSurge :number;
     eCDAnnulusSurge :number;
     eCDPipeSwab :number;
     eCDAnnulusSwab :number;
     equivalentCirculatingDensitySwab :number;
     totalPipePressureLoss :number;
     surgePipePressureLoss :number;
     swabPipePressureLoss :number;
     totalAnnulusPressureLoss :number;
     systemPressureLoss :number;
     maximumPumpPressure :number;
     surgeAnnulusPressureLoss :number;
     swabAnnulusPressureLoss :number;
     absoluteRoughness :number;
     yeildStress :number;
     InsidePipeFlowRate :number;
     OutsidePipeFlowRate :number;
     annularFlowRate :number;
     pipeCrticalFluidVelocity :number;
     pipeCriticalFlowRate :number;
     annularCrticalFluidVelocity :number;
     annularCriticalFlowRate :number;
     yeildPoint:number;


}

export interface OperationResult 
{
    dp:number;
    typeOfSection:string;
    topMeasuredDepth:number;
    bottomMeasuredDepth:number;
    topTrueVerticalDepth:number;
    bottomTrueVerticalDepth:number;
    length:number;
    pipeOuterArea:number;
    holeInnerArea:number;
    annularArea:number;
    pipeInnerArea:number;
    pipeOuterDiameter:number;
    crossSectionalArea:number;
    pipeInnerDiameter:number;
    pipeUnitWeight:number;
    pipeTotalWeight:number;
    buoyancyFactor:number;
    buoyancyWeight:number;
    yeildStrength:number;
    percentOfYield:number;
    tensileStrength:number;
    overPullMargin:number;
    topInclination:number;
    bottomInclination:number;
    topAzimuth:number;
    bottomAzimuth:number;
    dogLegSeverity:number;
    sideForce:number;
    momentOfInertia:number;
    polarMomentOfInertia:number;
    youngsModulus:number;
    radialClearance:number;
    holeSection :BaseHoleSectionModel;
     averageInclination :number;
     averageAzimuth:number; 
     criticalInclinationAngle:number; 
    section2D :string;
     criticalSinusoidalBuckling:number;
     criticalHelicalBuckling:number; 
     changeInInclination:number;
     changeInAzimuth:number; 
     mudDensityAnnulus :number;
     mudDensityInsidePipe :number;
     annulusHydrostaticPressure :number;
     insidePipeHydrostaticPressure :number;
     annulusHydrostaticPressureTop :number;
     insidePipeHydrostaticPressureTop :number;
     insidePipeHydrostaticChange :number;
     annulusHydrostaticChange :number;
     pipeBottomPressureForce :number;
     annulusBottomPressureForce :number;
     bucklingStabilityForce :number;
     effectiveTension :number;
     pressureLoss :number;
     fluidDragForce :number;
     shearRateInAnnulus :number;
     shearStress :number;
     torqueFromShearStress :number;
    annularFlowRegime :string;
    pipeFlowRegime :string;
     pipeReynoldsNumber :number;
     fluidViscosity :number;
     effectivePipeFluidViscosity :number;
     effectiveAnnulusFluidViscosity :number;
     pipeFluidVelocity :number;
     nozzleVelocity :number;
     pipeEffectiveFluidVelocity :number;
     clingingConstant :number;
     annulusReynoldsNumber :number;
     annulusFluidVelocity :number;
     annulusEffectiveFluidVelocity :number;
     pipeFrictionFactor:number;
     annulusFrictionFactor :number;
     pipePressureLoss :number;
     bitPowerOverArea :number;
     bitPressureLoss :number;
     bitPressureLoss2 :number;
     nozzleFlowArea :number;
     bitHydraulicPower :number;
     percentagebitHydraulicPower :number;
     parasticPressureLoss :number;
     bitImpactForce :number;
     annulusPressureLoss :number;
     surfacePressureLoss :number;
     equivalentCirculatingDensity :number;
     tripPerStand :number;
     eCDPipeSurge :number;
     eCDAnnulusSurge :number;
     eCDPipeSwab :number;
     eCDAnnulusSwab :number;
     equivalentCirculatingDensitySwab :number;
     totalPipePressureLoss :number;
     surgePipePressureLoss :number;
     swabPipePressureLoss :number;
     totalAnnulusPressureLoss :number;
     systemPressureLoss :number;
     maximumPumpPressure :number;
     surgeAnnulusPressureLoss :number;
     swabAnnulusPressureLoss :number;
     absoluteRoughness :number;
     yeildStress :number;
     InsidePipeFlowRate :number;
     OutsidePipeFlowRate :number;
     annularFlowRate :number;
     pipeCrticalFluidVelocity :number;
     pipeCriticalFlowRate :number;
     annularCrticalFluidVelocity :number;
     annularCriticalFlowRate :number;
     yeildPoint:number;

     maxDoglegSeverity :number;
     maxBendingStress :number;
     maxAxialStress :number;
     pipeRotationAngle :number;
     torqueAngle :number;
     torqueChange :number;
     normalForce :number;
     totalDrag :number;
     TensionIncrement :number;
     tensionTopOfPipe :number;
     tensionBottomOfPipe :number;
     ChangeIntension :number;
    HookeLoadAtJoint :number;
    HookeLoadAtJointTop :number;
     torqueBottom :number;
     torqueTop :number;
    isSinusoidalBuckling :boolean;
    isHelicalBuckling :boolean;
     angleSinusoidalBuckling :number;
     angleHelicalBuckling :number;
     pitchHelical :number;
     dogLegFromHelical :number;
     torequeFromHelical :number;
     shearStressFromHelical :number;
     bucklingStressInner :number;
     bucklingStressOuter :number;
     strainSinusoidal :number;
     strainHelical :number;
     sideForeceFromHelical :number;
     trueTensionHelical :number;
     axialLoadStrech :number;
     balloningStrech :number;
     radialStressInner :number;
     radialStressOuter :number;
     hoopStressInner :number;
     hoopStressOuter :number;
     vonMisesStressInner :number;
     vonMisesStressOuter :number;
     torsionStressInner :number;
     torsionStressOuter :number;
     helicalStrech :number;
     sinusoidalStrech :number;
     temparatureStrech :number;
     bendingStressInner :number;
     bendingStressOuter :number;
     axilStressInner :number;
     axilStressOuter :number;
     transverseStressInner :number;
     transverseStressOuter :number;
     stressRatio :number;
     effectiveStressInner :number;
     effectiveStressOuter :number;
     fatiqueLimit :number;
     fatiqueRatioInner :number;
     fatiqueRatioOuter :number;

    FormatResult():void;

}

export const OperationResultObj =
{
    dp: 4,
    typeOfSection: "",
    topMeasuredDepth: 0,
    bottomMeasuredDepth: 0,
    topTrueVerticalDepth: 0,
    bottomTrueVerticalDepth: 0,
    length: 0,
    pipeOuterArea: 0,
    holeInnerArea: 0,
    annularArea: 0,
    pipeInnerArea: 0,
    pipeOuterDiameter: 0,
    crossSectionalArea: 0,
    pipeInnerDiameter: 0,
    pipeUnitWeight: 0,
    pipeTotalWeight: 0,
    buoyancyFactor: 0,
    buoyancyWeight: 0,
    yeildStrength: 0,
    percentOfYield: 0,
    tensileStrength: 0,
    overPullMargin: 0,
    topInclination: 0,
    bottomInclination: 0,
    topAzimuth: 0,
    bottomAzimuth: 0,
    dogLegSeverity: 0,
    sideForce: 0,
    momentOfInertia: 0,
    polarMomentOfInertia: 0,
    youngsModulus: 0,
    radialClearance: 0,
    holeSection: {},
     averageInclination: 0,
     averageAzimuth: 0,
     criticalInclinationAngle: 0,
    section2D: "",
     criticalSinusoidalBuckling: 0,
     criticalHelicalBuckling: 0, 
     changeInInclination: 0,
     changeInAzimuth: 0,
     mudDensityAnnulus: 0,
     mudDensityInsidePipe: 0,
     annulusHydrostaticPressure: 0,
     insidePipeHydrostaticPressure: 0,
     annulusHydrostaticPressureTop: 0,
     insidePipeHydrostaticPressureTop: 0,
     insidePipeHydrostaticChange: 0,
     annulusHydrostaticChange: 0,
     pipeBottomPressureForce: 0,
     annulusBottomPressureForce: 0,
     bucklingStabilityForce: 0,
     effectiveTension: 0,
     pressureLoss: 0,
     fluidDragForce: 0,
     shearRateInAnnulus: 0,
     shearStress: 0,
     torqueFromShearStress: 0,
    annularFlowRegime: "",
    pipeFlowRegime: "",
     pipeReynoldsNumber: 0,
     fluidViscosity: 0,
     effectivePipeFluidViscosity: 0,
     effectiveAnnulusFluidViscosity: 0,
     pipeFluidVelocity: 0,
     nozzleVelocity: 0,
     pipeEffectiveFluidVelocity: 0,
     clingingConstant: 0,
     annulusReynoldsNumber: 0,
     annulusFluidVelocity: 0,
     annulusEffectiveFluidVelocity: 0,
     pipeFrictionFactor: 0,
     annulusFrictionFactor: 0,
     pipePressureLoss: 0,
     bitPowerOverArea: 0,
     bitPressureLoss: 0,
     bitPressureLoss2 :0,
     nozzleFlowArea :0,
     bitHydraulicPower : 0,
     percentagebitHydraulicPower: 0,
     parasticPressureLoss: 0,
     bitImpactForce: 0,
     annulusPressureLoss: 0,
     surfacePressureLoss: 0,
     equivalentCirculatingDensity: 0,
     tripPerStand: 0,
     eCDPipeSurge: 0,
     eCDAnnulusSurge: 0,
     eCDPipeSwab: 0,
     eCDAnnulusSwab: 0,
     equivalentCirculatingDensitySwab: 0,
     totalPipePressureLoss: 0,
     surgePipePressureLoss: 0,
     swabPipePressureLoss: 0,
     totalAnnulusPressureLoss: 0,
     systemPressureLoss: 0,
     maximumPumpPressure: 0,
     surgeAnnulusPressureLoss: 0,
     swabAnnulusPressureLoss: 0,
     absoluteRoughness: 0,
     yeildStress: 0,
     InsidePipeFlowRate: 0,
     OutsidePipeFlowRate: 0,
     annularFlowRate: 0,
     pipeCrticalFluidVelocity: 0,
     pipeCriticalFlowRate: 0,
     annularCrticalFluidVelocity: 0,
     annularCriticalFlowRate: 0,
     yeildPoint:0,

     maxDoglegSeverity:0,
     maxBendingStress :0,
     maxAxialStress  :0,
     pipeRotationAngle :0,
     torqueAngle :0,
     torqueChange :0,
     normalForce :0,
     totalDrag :0,
     TensionIncrement :0,
     tensionTopOfPipe :0,
     tensionBottomOfPipe :0,
     ChangeIntension :0,
    HookeLoadAtJoint :0,
    HookeLoadAtJointTop :0,
     torqueBottom :0,
     torqueTop :0,
    isSinusoidalBuckling :false,
    isHelicalBuckling : false,
     angleSinusoidalBuckling: 0,
     angleHelicalBuckling: 0,
     pitchHelical: 0,
     dogLegFromHelical: 0,
     torequeFromHelical: 0,
     shearStressFromHelical: 0,
     bucklingStressInner: 0,
     bucklingStressOuter: 0,
     strainSinusoidal: 0,
     strainHelical: 0,
     sideForeceFromHelical: 0,
     trueTensionHelical: 0,
     axialLoadStrech: 0,
     balloningStrech: 0,
     radialStressInner: 0,
     radialStressOuter: 0,
     hoopStressInner: 0,
     hoopStressOuter: 0,
     vonMisesStressInner: 0,
     vonMisesStressOuter: 0,
     torsionStressInner: 0,
     torsionStressOuter: 0,
     helicalStrech: 0,
     sinusoidalStrech: 0,
     temparatureStrech: 0,
     bendingStressInner: 0,
     bendingStressOuter: 0,
     axilStressInner: 0,
     axilStressOuter: 0,
     transverseStressInner: 0,
     transverseStressOuter: 0,
     stressRatio: 0,
     effectiveStressInner: 0,
     effectiveStressOuter: 0,
     fatiqueLimit: 0,
     fatiqueRatioInner: 0,
     fatiqueRatioOuter: 0,

    FormatResult():void
    {
        this.pipeOuterArea = Number(this.pipeOuterArea.toFixed(this.dp));
        this.pipeInnerArea = Number(this.pipeInnerArea.toFixed(this.dp));
        this.pipeUnitWeight = Number(this.pipeUnitWeight.toFixed(this.dp));
        this.pipeTotalWeight = Number(this.pipeTotalWeight.toFixed(this.dp));
        this.buoyancyFactor = Number(this.buoyancyFactor.toFixed(this.dp));
        this.buoyancyWeight = Number(this.buoyancyWeight.toFixed(this.dp));
        this.tensileStrength = Number(this.tensileStrength.toFixed(this.dp));
        this.topMeasuredDepth = Number(this.topMeasuredDepth.toFixed(this.dp));
        this.bottomMeasuredDepth = Number(this.bottomMeasuredDepth.toFixed(this.dp));
        this.topInclination = Number(this.topInclination.toFixed(this.dp));
        this.bottomInclination = Number(this.bottomInclination.toFixed(this.dp));
        this.averageInclination = Number(this.averageInclination.toFixed(this.dp));
        this.topAzimuth = Number(this.topAzimuth.toFixed(this.dp));
        this.bottomAzimuth = Number(this.bottomAzimuth.toFixed(this.dp));
        this.averageAzimuth = Number(this.averageAzimuth.toFixed(this.dp));
        this.dogLegSeverity = Number(this.dogLegSeverity.toFixed(this.dp));
        this.momentOfInertia = Number(this.momentOfInertia.toFixed(this.dp));
        this.polarMomentOfInertia = Number(this.polarMomentOfInertia.toFixed(this.dp));
        this.length = Number(this.length.toFixed(this.dp));
        this.normalForce = Number(this.normalForce.toFixed(this.dp));
        this.totalDrag = Number(this.totalDrag.toFixed(this.dp));
        this.HookeLoadAtJoint = Number(this.HookeLoadAtJoint.toFixed(this.dp));
        this.tensionTopOfPipe = Number(this.tensionTopOfPipe.toFixed(this.dp));
        this.tensionBottomOfPipe = Number(this.tensionBottomOfPipe.toFixed(this.dp));
        this.torqueBottom = Number(this.torqueBottom.toFixed(this.dp));
        this.torqueChange = Number(this.torqueChange.toFixed(this.dp));
        this.torqueTop = Number(this.torqueTop.toFixed(this.dp));
        this.criticalInclinationAngle = Number(this.criticalInclinationAngle.toFixed(this.dp));
        this.criticalSinusoidalBuckling = Number(this.criticalSinusoidalBuckling.toFixed(this.dp));
        this.criticalHelicalBuckling = Number(this.criticalHelicalBuckling.toFixed(this.dp));

    }

} as OperationResult;
