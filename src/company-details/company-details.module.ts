import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDetails } from './entity/company-details.entity';
import { CompanyDetailsController } from './company-details.controller';
import { CompanyDetailsService } from './company-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyDetails])],
  controllers: [CompanyDetailsController],
  providers: [CompanyDetailsService],
})
export class CompanyDetailsModule {}
