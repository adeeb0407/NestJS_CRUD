import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ServiceUnavailableException,
  HttpCode,
} from '@nestjs/common';
import { CreateCompanyDetailsDto } from './dto/create-company-details.dto';
import { CompanyDetailsService } from './company-details.service';
import { CompanyDetails } from './entity/company-details.entity';
import { UpdateCompanyDetailsDto } from './dto/update-company-details.dto';
import { Logger } from '@nestjs/common/services';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Company Details CRUD')
@Controller('companydetails')
export class CompanyDetailsController {
  private readonly logger = new Logger('companyDetailsController');
  constructor(private companyDetailsService: CompanyDetailsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get Company Details By ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '5284231e-a26e-4a53-9474-38228f20fef7',
    description: 'Enter the Unique ID of the Company',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Techwondoe Pvt LTD',
          description: 'Name of the Company',
        },
        website: {
          type: 'string',
          example: 'https://www.techwondoe.com/',
          description: 'Company Website',
        },
        registrationNumber: {
          type: 'integer',
          example: 655,
          description: 'Company Registration Number',
        },
        addresses: {
          type: 'array',
          example: [
            {
              line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
              line2: 'pune, Maharashtra',
            },
          ],
          description: 'Company Addresses',
        },
        industry: {
          type: 'string',
          example: 'Tech',
          description: 'Company Industry',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Company Details Not Found',
  })
  getCompanyDetailsById(@Param('id') id: string) {
    try {
      return this.companyDetailsService?.getCompanyDetailsById(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new ServiceUnavailableException(e.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Add Company Details' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Techwondoe',
          description: 'Name of the Company',
        },
        website: {
          type: 'string',
          example: 'https://www.techwondoe.com/',
          description: 'Company Website',
        },
        registrationNumber: {
          type: 'number',
          example: 655,
          description: 'Company Registration Number',
        },
        addresses: {
          type: 'array',
          example: [
            {
              line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
              line2: 'pune, Maharashtra',
            },
          ],
          description: 'Company addresses',
        },
        industry: {
          type: 'string',
          example: 'Tech',
          description: 'Company Industry',
        },
      },
    },
  })
  createCompanyDetails(
    @Body() createCompanyDetailsDto: CreateCompanyDetailsDto,
  ) {
    try {
      return this.companyDetailsService.createCompanyDetails(
        createCompanyDetailsDto,
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new ServiceUnavailableException(e.message);
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete Company Detail By ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '5284231e-a26e-4a53-9474-38228f20fef7',
    description: 'Enter the Unique ID of the Company',
  })
  deleteCompanyDetails(@Param('id') id: any) {
    try {
      return this.companyDetailsService.deleteCompanyDetails(id);
    } catch (e) {
      this.logger.error(e.message);
      throw new ServiceUnavailableException(e.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get All Companies Details' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  getAllCompanyDetails() {
    try {
      return this.companyDetailsService.getAllCompanyDetails();
    } catch (e) {
      this.logger.error(e.message);
      throw new ServiceUnavailableException(e.message);
    }
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update Company Details' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '5284231e-a26e-4a53-9474-38228f20fef7',
    description: 'Enter the Unique ID of the Company',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Techwondoe Pvt LTD',
          description: 'Name of the Company',
        },
        website: {
          type: 'string',
          example: 'https://www.techwondoe.com/',
          description: 'Company Website',
        },
        registrationNumber: {
          type: 'integer',
          example: 655,
          description: 'Company Registration Number',
        },
        addresses: {
          type: 'array',
          example: [
            {
              line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
              line2: 'pune, Maharashtra',
            },
          ],
          description: 'Company addresses',
        },
        industry: {
          type: 'string',
          example: 'Tech',
          description: 'Company Industry',
        },
      },
    },
  })
  updateCompanyDetailsStatus(
    @Param('id') id: string,
    @Body() updateCompanyDetailsDto: UpdateCompanyDetailsDto,
  ): Promise<CompanyDetails> {
    const { name, website, registrationNumber, addresses, industry } =
      updateCompanyDetailsDto;
    try {
      return this.companyDetailsService.updateCompanyDetailsStatus(
        id,
        name,
        website,
        registrationNumber,
        addresses,
        industry,
      );
    } catch (e) {
      this.logger.error(e.message);
      throw new ServiceUnavailableException(e.message);
    }
  }
}
