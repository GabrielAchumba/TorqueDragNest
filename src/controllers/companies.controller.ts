import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { Company, CompanyDocument } from '../models/company';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly companiesService: CompaniesService) {

    }

    @Post('PostCompany')
    async create(@Body() company: Company) {
        await this.companiesService.create(company);
    }

    @Get('GetCompanies/:id')
    findOne(@Param('id') id: string): Promise<CompanyDocument> {
        return this.companiesService.findOne(id);
    }

    @Patch('PutCompany/:id')
    update(@Param('id') id: string, @Body() company: Company) {
      return this.companiesService.update(id, company);
    }
  
    @Get('GetCompanies')
    async findAll(): Promise<CompanyDocument[]> {
        const companies = await this.companiesService.findAll();
        return companies;
    }

    @Delete('DeleteCompany/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.companiesService.remove(id);
    } 
}
