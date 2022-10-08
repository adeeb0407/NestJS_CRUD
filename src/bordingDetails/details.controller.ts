import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateDetailsDto } from './dto/create-details.dto';
import { DetailsService } from './details.service';
import { Details } from './entity/details.entity';
import { UpdateDetailsDto } from './dto/update-details.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('details')
export class DetailsController {
  constructor(private detailsService: DetailsService) {}

  @Get('/:id')
  getDetailsById(@Param('id') id: string | number) {
    try {
      return this.detailsService?.getDetailsById(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post()
  createDetails(@Body() createDetailsDto: CreateDetailsDto) {
    try {
      return this.detailsService.createDetails(createDetailsDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete('/:id')
  deleteDetails(@Param('id') id: any) {
    try {
      return this.detailsService.deleteDetails(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  getAllDetails() {
    try {
      return this.detailsService.getAllDetails();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('/:id')
  updateDetailsStatus(
    @Param('id') id: string,
    @Body() updateDetailsDto: UpdateDetailsDto,
  ): Promise<Details> {
    const { name, website, registrationNumber, address, industry } =
      updateDetailsDto;
    try {
      return this.detailsService.updateDetailsStatus(
        id,
        name,
        website,
        registrationNumber,
        address,
        industry,
      );
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
