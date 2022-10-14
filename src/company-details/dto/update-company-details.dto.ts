/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { Addresses } from '../company-addresses.interface';

export class UpdateCompanyDetailsDto {
  @IsOptional()
  name?: string;

  @IsOptional() // class-validator (pipes)
  website?: string;

  @IsOptional()
  registrationNumber?: number;

  @IsOptional()
  addresses?: Addresses[];

  @IsOptional()
  industry?: string;
}
