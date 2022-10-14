/* eslint-disable prettier/prettier */

import { Addresses } from '../company-addresses.interface';

export class CreateCompanyDetailsDto {
  id: string | number;

  name: string;

  website: string;

  registrationNumber: number;

  addresses: Addresses[];

  industry: string;
}
