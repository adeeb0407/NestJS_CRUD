/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDetailsService } from './company-details.service';

class ApiServiceMock {
  getAllCompanyDetails() {
    return [
      {
        id: '5284231e-a26e-4a53-9474-38228f20fef7',
        name: 'Techwondoe',
        website: 'https://www.techwondoe.com/',
        registrationNumber: 655,
        addresses: [
          {
            line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
            line2: 'pune, Maharashtra',
          },
        ],
        createdAt: '2022-10-13T01:11:29.991Z',
        updatedAt: '2022-10-13T01:11:29.991Z',
        industry: 'Tech',
      },
    ];
  }
}

const mockCreateCompanyDetails = {
  id: 'e99dd9c5-0a8d-4cd2-802f-fbf033bd1bde',
  name: 'Techwondoe',
  website: 'https://www.techwondoe.com/',
  registrationNumber: 655,
  addresses: [
    {
      line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
      line2: 'pune, Maharashtra',
    },
  ],
  industry: 'Tech',
};

describe('CompanyDetailsService', () => {
  let companyDetailsService: CompanyDetailsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CompanyDetailsService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyDetailsService, ApiServiceProvider],
    }).compile();

    companyDetailsService = module.get<CompanyDetailsService>(
      CompanyDetailsService,
    );
  });

  it('CompanyDetailsService - should be defined', () => {
    expect(companyDetailsService).toBeDefined();
  });

  const mockCompanyDetails = [
    {
      id: '5284231e-a26e-4a53-9474-38228f20fef7',
      name: 'Techwondoe',
      website: 'https://www.techwondoe.com/',
      registrationNumber: 655,
      addresses: [
        {
          line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
          line2: 'pune, Maharashtra',
        },
      ],
      createdAt: '2022-10-13T01:11:29.991Z',
      updatedAt: '2022-10-13T01:11:29.991Z',
      industry: 'Tech',
    },
  ];

  const mockUpdateCompanyDetails = {
    name: 'Smartle',
    website: 'https://www.techwondoe.com/',
    registrationNumber: 655,
    addresses: [
      {
        line1: 'sr.no 90 , buliding no 57 , kalas , alandi road',
        line2: 'pune, Maharashtra',
      },
    ],
    industry: 'Tech',
  };

  const mockId = 'e99dd9c5-0a8d-4cd2-802f-fbf033bd1bde';

  describe('All Company Details', () => {
    it('should get All Company Details', async () => {
      const result = await companyDetailsService.getAllCompanyDetails();
      expect(result).toEqual(mockCompanyDetails);
    });
  });

  describe('Company Details By ID', () => {
    it('Test Case should get Company Details By ID', async () => {
      const result = await companyDetailsService.getCompanyDetailsById(mockId);
      expect(result).toEqual(mockCompanyDetails);
    });
  });

  describe('Create Company Details', () => {
    it('should Create a new instacnce of company', async () => {
      const result = await companyDetailsService.createCompanyDetails(
        mockCreateCompanyDetails,
      );
      expect(result).toEqual(mockCompanyDetails);
    });
  });

  describe('Delete Company Details', () => {
    it('should Delete Company Details with respect t o the ID provided', async () => {
      const result = await companyDetailsService.deleteCompanyDetails(mockId);
      expect(result).toEqual(null);
    });
  });

  describe('Update Company Details', () => {
    it('should Update Company Details with provided Data', async () => {
      const result = await companyDetailsService.updateCompanyDetailsStatus(
        mockId,
        mockUpdateCompanyDetails.name,
        mockUpdateCompanyDetails.website,
        mockUpdateCompanyDetails.registrationNumber,
        mockUpdateCompanyDetails.addresses,
        mockUpdateCompanyDetails.industry,
      );
      expect(result).toEqual(mockUpdateCompanyDetails);
    });
  });
});
