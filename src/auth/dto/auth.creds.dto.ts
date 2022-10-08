/* eslint-disable prettier/prettier */
export class AuthRegisterDto {
  email: string;
  password: string;
}

export class AuthCredentialsDto {
  email: string;
  password: string;
}

export class AuthVerifyCodeDto {
  email: string;
  code: string;
}
