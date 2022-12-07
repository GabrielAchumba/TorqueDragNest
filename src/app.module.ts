import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './modules/companies.module';
import { CommonsModule } from './modules/commons.module';
import { DatumsModule } from './modules/datums.module';
import { DeviationSurvesModule } from './modules/deviationsurveys.module';
import { DrillBitsModule } from './modules/drillbits.module';
import { FluidsModule } from './modules/fluids.module';
import { BaseHoleSectionsModule } from './modules/baseholesections.module';
import { BasePipesModule } from './modules/basepipes.module';
import { IdentitiesModule } from './modules/identities.module';
import { MudPVTsModule } from './modules/mudpvts.module';
import { OperationsModule } from './modules/operations.module';
import { RigsModule } from './modules/rigs.module';
import { TorqueDragDesignsModule } from './modules/torquedragdesigns.module';
import { UsersModule } from './modules/users.module';
import { SensitivityParametersModule } from './modules/sensitivityParameters.module';
import { APIDrillPipesModule } from './modules/aPIDrillPipes.module';
import { CatalogsModule } from './modules/catalogs.module';


//console.log("MASTER DB", `${process.env.MASTER_DB}`);
//mongodb://localhost:27017/torquedragmasterdb
//'mongodb+srv://gabriel:gab*012021@cluster0.50dcf.mongodb.net/torquedragmasterdb?retryWrites=true&w=majority'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://gabriel:gab*012021@cluster0.50dcf.mongodb.net/torquedragmasterdb?retryWrites=true&w=majority',
     {connectionName: 'torquedragmasterdb'}),
    MongooseModule.forRoot('mongodb+srv://gabriel:gab*012021@cluster0.50dcf.mongodb.net/torquedragclientdb?retryWrites=true&w=majority', 
    {connectionName: 'torquedragclientdb'}),
  CompaniesModule, CommonsModule, DatumsModule, DeviationSurvesModule, DrillBitsModule,
  FluidsModule, BaseHoleSectionsModule, BasePipesModule, IdentitiesModule, MudPVTsModule,
  OperationsModule, RigsModule, TorqueDragDesignsModule, UsersModule, SensitivityParametersModule,
  APIDrillPipesModule, CatalogsModule],
})

//     "@types/bcrypt-nodejs": "0.0.31",

export class AppModule {}
