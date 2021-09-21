import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './modules/companies.module';
import { CommonsModule } from './modules/commons.module';
import { DatumsModule } from './modules/datums.module';
import { DeviationSurvesModule } from './modules/deviationsurveys.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/torquedragmasterdb'),
  CompaniesModule, CommonsModule, DatumsModule, DeviationSurvesModule],
})
export class AppModule {}
