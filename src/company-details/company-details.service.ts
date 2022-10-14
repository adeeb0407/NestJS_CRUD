import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from './company-addresses.interface';
import { CreateCompanyDetailsDto } from './dto/create-company-details.dto';
import { CompanyDetails } from './entity/company-details.entity';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class CompanyDetailsService {
  private logger = new Logger('CompanyDetailsService');
  constructor(
    @InjectRepository(CompanyDetails)
    private companyDetailsRepository: Repository<CompanyDetails>,
  ) {}

  async getCompanyDetailsById(id: string): Promise<CompanyDetails> {
    const found = await this.companyDetailsRepository.findOneBy({ id });

    if (!found) {
      this.logger.error(`Failed to GET Company Details with ID ${id}`);
      throw new NotFoundException(`Company Details with ${id} not found`);
    }
    this.logger.log(`Company Details Retrived for id ${id}`);
    return found;
  }

  async createCompanyDetails(createCompanyDetailsDto: CreateCompanyDetailsDto) {
    const { name, website, registrationNumber, addresses, industry } =
      createCompanyDetailsDto;

    const detail = this.companyDetailsRepository.create({
      name,
      website,
      registrationNumber,
      addresses,
      industry,
    });
    this.logger.log(`Company Details Instance Created`);
    await this.companyDetailsRepository.save(detail);
    return detail;
  }

  async deleteCompanyDetails(id: any): Promise<void> {
    const result = await this.companyDetailsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Company Details with ID "${id}" not found`);
    }
    this.logger.log(`Company Details Delete for id ${id}`);
    return;
  }

  async getAllCompanyDetails(): Promise<CompanyDetails[]> {
    const found = await this.companyDetailsRepository.find();

    if (!found) {
      this.logger.error(`Failed to GET Company Details`);
      throw new NotFoundException(`No Data Found`);
    }
    this.logger.log('All Companies Details Retrivied');
    return found;
  }

  async updateCompanyDetailsStatus(
    id: string,
    name: string,
    website: string,
    registrationNumber: number,
    addresses: Addresses[],
    industry: string,
  ): Promise<CompanyDetails> {
    const details = await this.getCompanyDetailsById(id);

    details.name = name;
    details.website = website;
    details.registrationNumber = registrationNumber;
    details.addresses = addresses;
    details.industry = industry;

    try {
      await this.companyDetailsRepository.save(details);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    this.logger.log(`Company Details Updated for id ${id}`);
    return details;
  }
}
