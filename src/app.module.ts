import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './modules/companies.module';
import { CommonsModule } from './modules/commons.module';
import { DatumsModule } from './modules/datums.module';
import { DeviationSurvesModule } from './modules/deviationsurveys.module';
import { DrillBitsModule } from './modules/drillbits.module';
import { FluidsModule } from './modules/fluids.module';
import { BaseHoleSectionsModule } from './modules/baseholesections.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/torquedragmasterdb'),
  CompaniesModule, CommonsModule, DatumsModule, DeviationSurvesModule, DrillBitsModule,
  FluidsModule, BaseHoleSectionsModule],
})
export class AppModule {}
