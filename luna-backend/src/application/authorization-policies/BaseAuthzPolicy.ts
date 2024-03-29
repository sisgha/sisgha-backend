//

import * as Authz from './statements/IAuthzStatement';

export abstract class BaseAuthzPolicy {
  abstract diarioFind: Authz.IAuthzStatementDiarioFind;
  abstract diarioDelete: Authz.IAuthzStatementDiarioDelete;
  abstract diarioUpdate: Authz.IAuthzStatementDiarioUpdate;
  abstract diarioCreate: Authz.IAuthzStatementDiarioCreate;
  abstract estadoFind: Authz.IAuthzStatementEstadoFind;
  abstract cidadeFind: Authz.IAuthzStatementCidadeFind;

  abstract campusFind: Authz.IAuthzStatementCampusFind;
  abstract campusCreate: Authz.IAuthzStatementCampusCreate;
  abstract campusUpdate: Authz.IAuthzStatementCampusUpdate;
  abstract campusDelete: Authz.IAuthzStatementCampusDelete;

  abstract blocoFind: Authz.IAuthzStatementBlocoFind;
  abstract blocoCreate: Authz.IAuthzStatementBlocoCreate;
  abstract blocoUpdate: Authz.IAuthzStatementBlocoUpdate;
  abstract blocoDelete: Authz.IAuthzStatementBlocoDelete;

  abstract ambienteFind: Authz.IAuthzStatementAmbienteFind;
  abstract ambienteCreate: Authz.IAuthzStatementAmbienteCreate;
  abstract ambienteUpdate: Authz.IAuthzStatementAmbienteUpdate;
  abstract ambienteDelete: Authz.IAuthzStatementAmbienteDelete;

  abstract reservaFind: Authz.IAuthzStatementReservaFind;
  abstract reservaDelete: Authz.IAuthzStatementReservaDelete;
  abstract reservaUpdate: Authz.IAuthzStatementReservaUpdate;
  abstract reservaCreate: Authz.IAuthzStatementReservaCreate;

  abstract usuarioFind: Authz.IAuthzStatementUsuarioFind;
  abstract usuarioCreate: Authz.IAuthzStatementUsuarioCreate;
  abstract usuarioUpdate: Authz.IAuthzStatementUsuarioUpdate;
  abstract usuarioDelete: Authz.IAuthzStatementUsuarioDelete;

  abstract modalidadeFind: Authz.IAuthzStatementModalidadeFind;
  abstract modalidadeCreate: Authz.IAuthzStatementModalidadeCreate;
  abstract modalidadeUpdate: Authz.IAuthzStatementModalidadeUpdate;
  abstract modalidadeDelete: Authz.IAuthzStatementModalidadeDelete;

  abstract cursoFind: Authz.IAuthzStatementCursoFind;
  abstract cursoDelete: Authz.IAuthzStatementCursoDelete;
  abstract cursoUpdate: Authz.IAuthzStatementCursoUpdate;
  abstract cursoCreate: Authz.IAuthzStatementCursoCreate;

  abstract disciplinaFind: Authz.IAuthzStatementDisciplinaFind;
  abstract disciplinaDelete: Authz.IAuthzStatementDisciplinaDelete;
  abstract disciplinaUpdate: Authz.IAuthzStatementDisciplinaUpdate;
  abstract disciplinaCreate: Authz.IAuthzStatementDisciplinaCreate;

  abstract turmaFind: Authz.IAuthzStatementTurmaFind;
  abstract turmaDelete: Authz.IAuthzStatementTurmaDelete;
  abstract turmaUpdate: Authz.IAuthzStatementTurmaUpdate;
  abstract turmaCreate: Authz.IAuthzStatementTurmaCreate;

  abstract vinculoFind: Authz.IAuthzStatementVinculoFind;

  abstract calendarioLetivoFind: Authz.IAuthzStatementCalendarioLetivoFind;
  abstract calendarioLetivoDelete: Authz.IAuthzStatementCalendarioLetivoDelete;
  abstract calendarioLetivoUpdate: Authz.IAuthzStatementCalendarioLetivoUpdate;
  abstract calendarioLetivoCreate: Authz.IAuthzStatementCalendarioLetivoCreate;

  get statements() {
    return [
      //
      //
      //
      this.estadoFind,
      this.cidadeFind,
      this.campusFind,
      this.campusCreate,
      this.campusUpdate,
      this.campusDelete,
      this.blocoFind,
      this.blocoCreate,
      this.blocoUpdate,
      this.blocoDelete,
      this.modalidadeFind,
      this.modalidadeCreate,
      this.modalidadeUpdate,
      this.modalidadeDelete,
      this.ambienteFind,
      this.ambienteCreate,
      this.ambienteUpdate,
      this.ambienteDelete,
      this.reservaCreate,
      this.reservaUpdate,
      this.reservaDelete,
      this.reservaFind,
      this.usuarioFind,
      this.usuarioCreate,
      this.usuarioUpdate,
      this.usuarioDelete,
      this.vinculoFind,
      this.cursoCreate,
      this.cursoUpdate,
      this.cursoDelete,
      this.cursoFind,
      this.disciplinaCreate,
      this.disciplinaUpdate,
      this.disciplinaDelete,
      this.disciplinaFind,
      this.turmaCreate,
      this.turmaUpdate,
      this.turmaDelete,
      this.turmaFind,
      this.diarioCreate,
      this.diarioUpdate,
      this.diarioDelete,
      this.diarioFind,
      this.calendarioLetivoCreate,
      this.calendarioLetivoUpdate,
      this.calendarioLetivoDelete,
      this.calendarioLetivoFind,
    ];
  }
}
