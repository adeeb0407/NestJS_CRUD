import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailsDto } from './dto/create-details.dto';
import { Details } from './entity/details.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Details) private detailsRepository: Repository<Details>,
  ) {}

  async getDetailsById(id: any): Promise<Details> {
    const found = await this.detailsRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Details with ${id} not found`);
    }
    return found;
  }

  async createDetails(createDetailsDto: CreateDetailsDto) {
    const { name, website, registrationNumber, address, industry } =
      createDetailsDto;

    const detail = this.detailsRepository.create({
      name,
      website,
      registrationNumber,
      address,
      industry,
    });

    await this.detailsRepository.save(detail);
    return detail;
  }

  async deleteDetails(id: any): Promise<object> {
    await this.detailsRepository.delete({ id });
    return { message: 'success' };
  }

  async getAllDetails(): Promise<Details[]> {
    const found = await this.detailsRepository.find();

    if (!found) {
      throw new NotFoundException(`No Data Found`);
    }

    return found;
  }

  async updateDetailsStatus(
    id: string,
    name: string,
    website: string,
    registrationNumber: number,
    address: [],
    industry: string,
  ): Promise<Details> {
    const details = await this.getDetailsById(id);

    details.name = name;
    details.website = website;
    details.registrationNumber = registrationNumber;
    details.address = address;
    details.industry = industry;

    await this.detailsRepository.save(details);

    return details;
  }
}
