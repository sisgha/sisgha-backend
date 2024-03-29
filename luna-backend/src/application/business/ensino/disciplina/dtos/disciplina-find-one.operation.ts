import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DisciplinaDto, DisciplinaDtoProperties, DisciplinaDtoValidationContract } from './disciplina.dto';

// ======================================================

@ObjectType('DisciplinaFindOneResultDto')
export class DisciplinaFindOneResultDto implements Dto.IDisciplinaFindOneResultDto {
  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_ID)
  id!: string;

  //

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_NOME)
  nome!: string;

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_CARGA_HORARIA)
  cargaHoraria!: number;

  //
}

// ======================================================

export const DisciplinaFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DisciplinaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DisciplinaFindOneByIdInputDto')
export class DisciplinaFindOneByIdInputDto implements Dto.IDisciplinaFindOneByIdInputDto {
  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_ID)
  id!: string;
}

export const DISCIPLINA_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "disciplina"" por ID.',

  gql: {
    name: 'disciplinaFindOneById',

    inputDtoType: () => DisciplinaFindOneByIdInputDto,
    inputDtoValidationContract: DisciplinaFindOneByIdInputValidationContract,

    returnType: () => DisciplinaDto,
  },

  swagger: {
    returnType: DisciplinaFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da disciplina.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
