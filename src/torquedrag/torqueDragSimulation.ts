import { AllInputsDTO } from "src/dtos/allInputsDTO";

export class TorqueDragSimulation {
  
    public static allInputs:AllInputsDTO;
    //public static simulationDTO:SimulationDTO;


   /*  public static SensitivityResultsDTO Run()
    {
        string doglegSeverityMethod = "Lubrinski", bucklingMethod = "Inclined";

        List<double> DevSurveyMD = DevSurveyUtils.GetDevSurveyMDs(allInputs.deviationSurveys);

        List<double> DevSurveyInclination = DevSurveyUtils.GetDevSurveyInclinations(allInputs.deviationSurveys);

        List<double> DevSurveyAzimuth = DevSurveyUtils.GetDevSurveyAzimuths(allInputs.deviationSurveys);

        List<double> DevSurveyTVD = DevSurveyUtils.GetDevSurveyTVDs(allInputs.deviationSurveys);

        List<double> DevSurveyVerticalDisplacement = DevSurveyUtils.GetDevSurveyVerticalSections(allInputs.deviationSurveys);

        List<double> DevSurveyDogLegs = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        double LastMDHole = allInputs.holeSections[allInputs.holeSections.Count - 1].bottomOfHole.Value;

        allInputs.pipes = Sorting.SortListofPipeReversed(allInputs.pipes);

        var pipesTuple = PipeUtils.GetPipeDecrementsNew(allInputs.pipes, allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);
        List<Pipe> sortedPipeIncrements = Sorting.SortListofPipeReversed(pipesTuple.Item1);
        List<bool> _isJoints = pipesTuple.Item2;




        //List<double> DevSurveyDogLegSeverities = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        if (allInputs.operation.torqueAtBitDrillingOperation == null)
            allInputs.operation.torqueAtBitDrillingOperation = 0;

        if (allInputs.operation.torqueAtBit == null)
            allInputs.operation.torqueAtBit = 0;

        if (allInputs.operation.torqueAtBitBackReaming == null)
            allInputs.operation.torqueAtBitBackReaming = 0;

        if (allInputs.operation.weightOnBit == null)
            allInputs.operation.weightOnBit = 0;

        if (allInputs.operation.weightOnBitIDHM == null)
            allInputs.operation.weightOnBitIDHM = 0;

        List<BaseOperationResult> baseOperationResults = RunBaseOperation(sortedPipeIncrements,
                                                                allInputs.holeSections, doglegSeverityMethod,
                                                                allInputs.mudPVTs, allInputs.common);

        SimulationResultsDTO simulationResultsDTO = new SimulationResultsDTO();
        simulationResultsDTO.isTrippingInChecked = allInputs.operation.isTrippingInChecked;
        simulationResultsDTO.isTrippingOutChecked = allInputs.operation.isTrippingOutChecked;
        simulationResultsDTO.isRotatingOnBottomChecked = allInputs.operation.isRotatingOnBottomChecked;
        simulationResultsDTO.isSlideDrillingChecked = allInputs.operation.isSlideDrillingChecked;
        simulationResultsDTO.isBackReamingChecked = allInputs.operation.isBackReamingChecked;
        simulationResultsDTO.isRotatingOffBottomChecked = allInputs.operation.isRotatingOffBottomChecked;


        if (allInputs.operation.isTrippingInChecked)
            simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                               allInputs.mudPVTs, allInputs.common, baseOperationResults);

        if (allInputs.operation.isTrippingOutChecked)
            simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                               allInputs.mudPVTs, allInputs.common, baseOperationResults);

        if (allInputs.operation.isRotatingOnBottomChecked)
            simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                              allInputs.mudPVTs, allInputs.common, baseOperationResults);

        if (allInputs.operation.isRotatingOffBottomChecked)
            simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                              allInputs.mudPVTs, allInputs.common, baseOperationResults);

        if (allInputs.operation.isSlideDrillingChecked)
            simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                              allInputs.mudPVTs, allInputs.common, baseOperationResults);

        if (allInputs.operation.isBackReamingChecked)
            simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                              allInputs.mudPVTs, allInputs.common, baseOperationResults);



        SensitivityResultsDTO sensitivityResultsDTO = new SensitivityResultsDTO();
        List<SimulationResultsDTO> simulationResultDTOs = new List<SimulationResultsDTO>();
        simulationResultDTOs.Add(simulationResultsDTO);
        sensitivityResultsDTO.simulationResultsDTOs = new List<SimulationResultsDTO>(simulationResultDTOs);


        return sensitivityResultsDTO;
    }

    public static SensitivityResultsDTO RunSensitivities()
    {
        string doglegSeverityMethod = "Lubrinski", bucklingMethod = "Inclined";

        List<double> DevSurveyMD = DevSurveyUtils.GetDevSurveyMDs(allInputs.deviationSurveys);

        List<double> DevSurveyInclination = DevSurveyUtils.GetDevSurveyInclinations(allInputs.deviationSurveys);

        List<double> DevSurveyAzimuth = DevSurveyUtils.GetDevSurveyAzimuths(allInputs.deviationSurveys);

        List<double> DevSurveyTVD = DevSurveyUtils.GetDevSurveyTVDs(allInputs.deviationSurveys);

        List<double> DevSurveyVerticalDisplacement = DevSurveyUtils.GetDevSurveyVerticalSections(allInputs.deviationSurveys);

        List<double> DevSurveyDogLegs = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        double LastMDHole = allInputs.holeSections[allInputs.holeSections.Count - 1].bottomOfHole.Value;

        allInputs.pipes = Sorting.SortListofPipeReversed(allInputs.pipes);

        var pipesTuple = PipeUtils.GetPipeDecrementsNew(allInputs.pipes, allInputs.common, DevSurveyMD, DevSurveyInclination, DevSurveyAzimuth,
                                        DevSurveyTVD, DevSurveyVerticalDisplacement, DevSurveyDogLegs, LastMDHole);
        List<Pipe> sortedPipeIncrements = Sorting.SortListofPipeReversed(pipesTuple.Item1);
        List<bool> _isJoints = pipesTuple.Item2;




        //List<double> DevSurveyDogLegSeverities = DevSurveyUtils.GetDevSurveyDogLeg(allInputs.deviationSurveys);

        if (allInputs.operation.torqueAtBitDrillingOperation == null)
            allInputs.operation.torqueAtBitDrillingOperation = 0;

        if (allInputs.operation.torqueAtBit == null)
            allInputs.operation.torqueAtBit = 0;

        if (allInputs.operation.torqueAtBitBackReaming == null)
            allInputs.operation.torqueAtBitBackReaming = 0;

        if (allInputs.operation.weightOnBit == null)
            allInputs.operation.weightOnBit = 0;

        if (allInputs.operation.weightOnBitIDHM == null)
            allInputs.operation.weightOnBitIDHM = 0;

        List<BaseOperationResult> baseOperationResults = RunBaseOperation(sortedPipeIncrements,
                                                                allInputs.holeSections, doglegSeverityMethod,
                                                                allInputs.mudPVTs, allInputs.common);

        SensitivityResultsDTO sensitivityResultsDTO = new SensitivityResultsDTO();
        List<SimulationResultsDTO> simulationResultDTOs = new List<SimulationResultsDTO>();
        SimulationResultsDTO simulationResultsDTO = new SimulationResultsDTO();
        int noOfSensitivities = simulationDTO.noOfSensitivities;
        simulationResultDTOs = new List<SimulationResultsDTO>();


        for (int i = 1; i <= noOfSensitivities; i++)
        {
            simulationResultsDTO = new SimulationResultsDTO();
            simulationResultsDTO.isTrippingInChecked = allInputs.operation.isTrippingInChecked;
            simulationResultsDTO.isTrippingOutChecked = allInputs.operation.isTrippingOutChecked;
            simulationResultsDTO.isRotatingOnBottomChecked = allInputs.operation.isRotatingOnBottomChecked;
            simulationResultsDTO.isSlideDrillingChecked = allInputs.operation.isSlideDrillingChecked;
            simulationResultsDTO.isBackReamingChecked = allInputs.operation.isBackReamingChecked;
            simulationResultsDTO.isRotatingOffBottomChecked = allInputs.operation.isRotatingOffBottomChecked;
            switch (i)
            {
                case 1:
                    if (allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingIn_1,
                                                                           simulationDTO.sensitivityParameters.trippingIn_2);

                    if (allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingOut_1,
                                                                           simulationDTO.sensitivityParameters.trippingOut_2);

                    if (allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.drilling_1,
                                                                          simulationDTO.sensitivityParameters.drilling_2);

                    if (allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_1,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_2);


                    if (allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_1,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_2);

                    if (allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.backReaming_1,
                                                                          simulationDTO.sensitivityParameters.backReaming_2);
                    simulationResultDTOs.Add(simulationResultsDTO);
                    break;
                case 2:
                    if (allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingIn_3,
                                                                           simulationDTO.sensitivityParameters.trippingIn_4);

                    if (allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingOut_3,
                                                                           simulationDTO.sensitivityParameters.trippingOut_4);

                    if (allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.drilling_3,
                                                                          simulationDTO.sensitivityParameters.drilling_4);

                    if (allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_3,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_4);

                    if (allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_3,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_4);

                    if (allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.backReaming_3,
                                                                          simulationDTO.sensitivityParameters.backReaming_4);
                    simulationResultDTOs.Add(simulationResultsDTO);
                    break;
                case 3:
                    if (allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingIn_5,
                                                                           simulationDTO.sensitivityParameters.trippingIn_6);

                    if (allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingOut_5,
                                                                           simulationDTO.sensitivityParameters.trippingOut_6);

                    if (allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.drilling_5,
                                                                          simulationDTO.sensitivityParameters.drilling_6);

                    if (allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_5,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_6);

                    if (allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_5,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_6);

                    if (allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.backReaming_5,
                                                                          simulationDTO.sensitivityParameters.backReaming_6);
                    simulationResultDTOs.Add(simulationResultsDTO);
                    break;
                case 4:
                    if (allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingIn_7,
                                                                           simulationDTO.sensitivityParameters.trippingIn_8);

                    if (allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingOut_7,
                                                                           simulationDTO.sensitivityParameters.trippingOut_8);

                    if (allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.drilling_7,
                                                                          simulationDTO.sensitivityParameters.drilling_8);

                    if (allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_7,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_8);

                    if (allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_7,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_8);

                    if (allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.backReaming_7,
                                                                          simulationDTO.sensitivityParameters.backReaming_8);
                    simulationResultDTOs.Add(simulationResultsDTO);
                    break;
                case 5:
                    if (allInputs.operation.isTrippingInChecked)
                        simulationResultsDTO.trippingInResults = RunTrippingInOpertion(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingIn_9,
                                                                           simulationDTO.sensitivityParameters.trippingIn_10);

                    if (allInputs.operation.isTrippingOutChecked)
                        simulationResultsDTO.trippingOutResults = RunTrippingOutOperation(sortedPipeIncrements, allInputs.operation,
                                                                           allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                           simulationDTO.sensitivityParameters.trippingOut_9,
                                                                           simulationDTO.sensitivityParameters.trippingOut_10);

                    if (allInputs.operation.isRotatingOnBottomChecked)
                        simulationResultsDTO.DrillingResults = RunRotatingOnBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.drilling_9,
                                                                          simulationDTO.sensitivityParameters.drilling_10);

                    if (allInputs.operation.isRotatingOffBottomChecked)
                        simulationResultsDTO.rotatingOffBottomResults = RunRotatingOffBottomOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_9,
                                                                          simulationDTO.sensitivityParameters.rotatingOffBottom_10);

                    if (allInputs.operation.isSlideDrillingChecked)
                        simulationResultsDTO.SlideDrillingResults = RunSlideDrillingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_9,
                                                                          simulationDTO.sensitivityParameters.slideDrilling_10);

                    if (allInputs.operation.isBackReamingChecked)
                        simulationResultsDTO.BackReamingResults = RunBackReamingOperation(sortedPipeIncrements, allInputs.operation,
                                                                          allInputs.mudPVTs, allInputs.common, baseOperationResults,
                                                                          simulationDTO.sensitivityParameters.backReaming_9,
                                                                          simulationDTO.sensitivityParameters.backReaming_10);
                    simulationResultDTOs.Add(simulationResultsDTO);
                    break;
            }

        }

        sensitivityResultsDTO.simulationResultsDTOs = new List<SimulationResultsDTO>(simulationResultDTOs);
        return sensitivityResultsDTO;
    } */



}