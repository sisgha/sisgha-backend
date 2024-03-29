import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthenticationService } from '../authentication.service';
import { AuthStrategies } from './auth-strategies';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, AuthStrategies.ACCESS_TOKEN) {
  constructor(private authenticationService: AuthenticationService) {
    super();
  }

  async validate(accessToken?: string) {
    const currentUsuario = await this.authenticationService.getCurrentFuncionarioByAccessToken(accessToken);

    if (!currentUsuario) {
      throw new UnauthorizedException('Not authenticated.');
    }

    return currentUsuario;
  }
}
