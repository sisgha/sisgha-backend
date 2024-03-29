import { ICampusModel } from '../../../../ambientes';
import { IUsuarioVinculoCampusModel } from '../../../usuario-vinculo-campus';
import { IUsuarioModel } from '../../IUsuarioModel';

export interface IUsuarioFindOneResultDtoVinculoAtivoCampus extends Pick<ICampusModel, 'id' | 'razaoSocial' | 'nomeFantasia'> {}

export interface IUsuarioFindOneResultDtoVinculoAtivo extends Pick<IUsuarioVinculoCampusModel, 'id' | 'cargo' | 'ativo'> {
  campus: IUsuarioFindOneResultDtoVinculoAtivoCampus;
}

export interface IUsuarioFindOneResultDto extends Pick<IUsuarioModel, 'id' | 'nome' | 'matriculaSiape' | 'email'> {
  vinculosAtivos: IUsuarioFindOneResultDtoVinculoAtivo[];
}
