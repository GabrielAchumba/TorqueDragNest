import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviationSurvey, DeviationSurveyDocument } from '../models/deviationSurvey';

@Injectable()
export class DeviationSurveysService {
    constructor(@InjectModel('DeviationSurvey') private readonly deviationSurveyModel: Model<DeviationSurveyDocument>,) {

    }

    async create(deviationSurvey: DeviationSurvey): Promise<DeviationSurveyDocument> {
        
        const foundDeviationSurvey = await this.deviationSurveyModel.findOne({ "designId" : deviationSurvey.designId });
        
        if(foundDeviationSurvey == null || foundDeviationSurvey == undefined){
            const newDeviationSurvey = new this.deviationSurveyModel(deviationSurvey);
            return  newDeviationSurvey.save();
        }
        
        return  foundDeviationSurvey;
    }

   

    async findAll(): Promise<DeviationSurveyDocument[]> {
        return this.deviationSurveyModel.find().exec();
    }

    async findOne(id: string): Promise<DeviationSurveyDocument> {
        const deviationSurvey = await this.deviationSurveyModel.findById(id);

        if(!deviationSurvey){
            throw new NotFoundException("could not find deviationSurvey.")
        }

        return deviationSurvey;
    }

    async update(id: string, deviationSurvey: DeviationSurvey): Promise<DeviationSurveyDocument> {
        const updatedDeviationSurvey = await this.deviationSurveyModel.findById(id);
        if(updatedDeviationSurvey != null || updatedDeviationSurvey != undefined){
            Object.assign(updatedDeviationSurvey, deviationSurvey);
            updatedDeviationSurvey.save();
        }

        return  updatedDeviationSurvey;
    }

    async remove(id: string): Promise<void> {
        await this.deviationSurveyModel.deleteOne({id}).exec();
    }
}
