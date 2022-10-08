/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class UpdateDetailsDto {
  @IsOptional()
  name?: string;

  @IsOptional() // class-validator (pipes)
  website?: string;

  @IsOptional()
  registrationNumber?: number;

  @IsOptional()
  address?: [];

  @IsOptional()
  industry?: string;
}
