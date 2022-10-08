import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import {
  AuthCredentialsDto,
  AuthRegisterDto,
  AuthVerifyCodeDto,
} from './dto/auth.creds.dto';

const poolData: ICognitoUserPoolData = {
  UserPoolId: 'ap-south-1_aFlE9qxGz',
  ClientId: '7trqouonoof0uidoq1psmqbohh',
};
const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'ap-south-1_aFlE9qxGz',
      ClientId: '7trqouonoof0uidoq1psmqbohh',
    });
  }

  get secretKey() {
    return 'Psoa53145d';
  }

  async register(authRegisterRequest: AuthRegisterDto) {
    const { email, password } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async confirmCode(codeDto: AuthVerifyCodeDto) {
    const { email, code } = codeDto;
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(
      code,
      true,
      function (err: any, result: any) {
        if (err) {
          console.log(err);
          return err;
        }
        return result;
      },
    );
  }

  async authenticateUser(user: AuthCredentialsDto): Promise<object> {
    const { email, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
