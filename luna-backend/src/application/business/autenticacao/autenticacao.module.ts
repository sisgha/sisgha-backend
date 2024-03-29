import { Module } from '@nestjs/common';
import { KeycloakModule } from 'infrastructure/authentication/idp-external-connect/keycloak';
import { OpenidConnectModule } from './../../../infrastructure/authentication/idp-external-connect/openid-connect/openid-connect.module';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoResolver } from './autenticacao.resolver';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioVinculoCampusModule } from './usuario-vinculo-campus/usuario-vinculo-campus.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule, UsuarioVinculoCampusModule, OpenidConnectModule, KeycloakModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, AutenticacaoResolver],
  exports: [],
})
export class AutenticacaoModule {}
