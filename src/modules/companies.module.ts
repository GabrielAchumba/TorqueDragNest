import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesController } from '../controllers/companies.controller';
import { CompaniesService } from '../services/companies.service';
import {CompanySchema } from '../models/company'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
