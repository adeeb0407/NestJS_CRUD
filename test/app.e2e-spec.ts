import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { CompanyDetailsService } from 'src/company-details/company-details.service';
import { AppModule } from 'src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [CompanyDetailsService],
    }).compile();

    app = mockAppModule.createNestApplication();
    httpService = mockAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  it('GET Company Details if API finds the Company Data', async () => {
    const result: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const expectedOutput = [
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
    const response = await request(app.getHttpServer())
      .get('/companydetails')
      .expect(200);
    expect(response).toEqual(expectedOutput);
  });

  it('throws error if GET request is an incorrect url', async () => {
    return await request(app.getHttpServer())
      .get('/companydetails3')
      .expect(400);
  });

  it('throws error if API cannot find the companies details', async () => {
    const result: AxiosResponse = {
      data: {},
      status: 404,
      statusText: '',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    return await request(app.getHttpServer())
      .get('/companydetails/3')
      .expect(404);
  });
});
