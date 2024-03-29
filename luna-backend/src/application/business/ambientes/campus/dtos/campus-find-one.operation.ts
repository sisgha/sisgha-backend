import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICampusFindOneByIdInputDto, ICampusFindOneResultDto, IEnderecoFindOneResultDto } from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CampusDto, CampusDtoProperties, CampusDtoValidationContract } from './campus.dto';

// ======================================================

@ObjectType('CampusFindOneResultDto')
export class CampusFindOneResultDto implements ICampusFindOneResultDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;

  //

  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA)
  nomeFantasia!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL)
  razaoSocial!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO)
  apelido!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ)
  cnpj!: string;

  //

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_OUTPUT)
  endereco!: IEnderecoFindOneResultDto;
}

// ======================================================

export const CampusFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CampusDtoValidationContract(), 'id'),
  }),
);
// ======================================================

@InputType('CampusFindOneByIdInputDto')
export class CampusFindOneByIdInputDto implements ICampusFindOneByIdInputDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;
}

export const CAMPUS_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um campus por ID.',

  gql: {
    name: 'campusFindOneById',

    inputDtoType: () => CampusFindOneByIdInputDto,
    inputDtoValidationContract: CampusFindOneByIdInputValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    returnType: CampusFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID do campus.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
