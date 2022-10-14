import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDetailsController } from './company-details.controller';
import { CompanyDetailsService } from './company-details.service';

const mockCompanyDetails = {
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
  createdAt: '2022-10-13T01:11:29.991Z',
  updatedAt: '2022-10-13T01:11:29.991Z',
  industry: 'Tech',
};

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

describe('CompanyDetailsController', () => {
  let controller: CompanyDetailsController;
  let service: CompanyDetailsService;

  beforeEach(async () => {
    const companyDetailsProvider = {
      provide: CompanyDetailsService,
      useFactory: () => ({
        getAllCompanyDetails: jest.fn(() => mockCompanyDetails),
        getCompanyDetailsById: jest.fn(() => mockCompanyDetails),
        createCompanyDetails: jest.fn(() => mockCompanyDetails),
        deleteCompanyDetails: jest.fn(() => null),
        updateCompanyDetailsStatus: jest.fn(() => mockCompanyDetails),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDetailsController],
      providers: [CompanyDetailsService, companyDetailsProvider],
    }).compile();
    controller = module.get<CompanyDetailsController>(CompanyDetailsController);
    service = module.get<CompanyDetailsService>(CompanyDetailsService);
  });

  describe('Get All Company Details', () => {
    it('calls ComapanyRepository with getAllCompanyDetails API and returns the result', async () => {
      controller.getAllCompanyDetails();
      expect(service.getAllCompanyDetails()).toEqual(mockCompanyDetails);
    });
  });

  describe('GetCompany Details By ID', () => {
    const id = 'e99dd9c5-0a8d-4cd2-802f-fbf033bd1bde';
    it('calls ComapanyRepository with getCompanyDetailsById API and returns the result', async () => {
      controller.getCompanyDetailsById(id);
      expect(service.getCompanyDetailsById(id)).toEqual(mockCompanyDetails);
    });
  });

  describe('Creates Comopany Details', () => {
    it('calls ComapanyRepository with createCompanyDetails API and returns the result', async () => {
      controller.createCompanyDetails(mockCreateCompanyDetails);
      expect(service.createCompanyDetails(mockCreateCompanyDetails)).toEqual(
        mockCompanyDetails,
      );
    });
  });

  describe('Deletes Comopany Details', () => {
    it('calls ComapanyRepository with deleteCompanyDetails API and returns the result', async () => {
      const id = 'e99dd9c5-0a8d-4cd2-802f-fbf033bd1bde';
      controller.deleteCompanyDetails(id);
      expect(service.deleteCompanyDetails(id)).toEqual(null);
    });
  });

  describe('Updates Company Details', () => {
    it('calls ComapanyRepository with updateCompanyDetailsStatus API and returns the result', async () => {
      const id = 'e99dd9c5-0a8d-4cd2-802f-fbf033bd1bde';
      controller.updateCompanyDetailsStatus(id, mockUpdateCompanyDetails);
      expect(
        service.updateCompanyDetailsStatus(
          id,
          mockUpdateCompanyDetails.name,
          mockUpdateCompanyDetails.website,
          mockUpdateCompanyDetails.registrationNumber,
          mockUpdateCompanyDetails.addresses,
          mockUpdateCompanyDetails.industry,
        ),
      ).toEqual(mockCompanyDetails);
    });
  });
});
