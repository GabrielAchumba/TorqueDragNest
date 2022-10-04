import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviationSurvey, DeviationSurveyDocument, DeviationSurveyModel } from '../models/deviationSurvey';

@Injectable()
export class DeviationSurveysService {
    constructor(@InjectModel('DeviationSurvey') private readonly deviationSurveyModel: Model<DeviationSurveyDocument>,) {

    }

    async create(deviationSurvey: DeviationSurvey): Promise<DeviationSurveyDocument> {
        const foundDeviationSurvey = await this.deviationSurveyModel.findOne(
            { "userId" : deviationSurvey.userId, "designId" : deviationSurvey.designId });
        
        if(foundDeviationSurvey == null || foundDeviationSurvey == undefined){
            const newDeviationSurvey = new this.deviationSurveyModel(deviationSurvey);
            return  newDeviationSurvey.save();
        }
        
        return  foundDeviationSurvey;
    }

   

    async findAll(): Promise<DeviationSurveyDocument[]> {
        return this.deviationSurveyModel.find().exec();
    }

    async findOne(designId: string): Promise<any> {
        const deviationSurvey = await this.deviationSurveyModel.findOne({designId:designId});
        if(!deviationSurvey){
            return [] as DeviationSurveyModel[]
        }

        return deviationSurvey.deviationSurveys;
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
