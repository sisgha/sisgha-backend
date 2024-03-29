import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';
import { IBlocoModel } from '../bloco';

export interface IAmbienteModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  descricao: string;
  codigo: string;

  capacidade: number | null;
  tipo: string | null;

  //

  bloco: IBlocoModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
