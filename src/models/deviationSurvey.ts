import * as mongoose from 'mongoose';

export class DeviationSurveyModel {
    measuredDepth: number;
    inclination: number;
    azimuth: number;
    doglegSeverity: number;
    isSelected: boolean;
    trueVerticalDepth: number;
    northSouth: number;
    eastWest: number;
    verticalSection: number;
    tol: string;
  }

  export class DeviationSurvey {
    surveyName: string;
    designId: string;
    userId: string;
    deviationSurveys: DeviationSurveyModel[];
  }

export interface DeviationSurveyDocument extends mongoose.Document, DeviationSurvey { }

export const DeviationSurveySchema = new mongoose.Schema({
    surveyName: {type: String, required: true },
    designId: {type: String, required: true },
    userId: {type: String, required: true },
    deviationSurveys: [{
        measuredDepth: {
            type: Number,
            required: false
        },
        inclination: {
            type: Number,
            required: false
        },
        azimuth: {
            type: Number,
            required: false
        }, 
        doglegSeverity: {
            type: Number,
            required: false
        }, 
        isSelected: {
            type: Boolean,
            required: false
        }, 
        trueVerticalDepth: {
            type: Number,
            required: false
        }, 
        northSouth: {
            type: Number,
            required: false
        },
        eastWest: {
            type: Number,
            required: false
        }, 
        verticalSection: {
            type: Number,
            required: false
        }, 
        tol: {
            type: String,
            required: false
        }
    }]
  
  });
