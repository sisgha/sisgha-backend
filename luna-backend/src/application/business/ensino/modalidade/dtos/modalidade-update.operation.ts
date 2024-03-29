import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { IModalidadeUpdateDto } from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { ModalidadeFindOneByIdInputValidationContract, ModalidadeFindOneResultDto } from './modalidade-find-one.operation';
import { ModalidadeInputDtoValidationContract } from './modalidade-input.operation';
import { ModalidadeDto, ModalidadeDtoProperties } from './modalidade.dto';

// ======================================================

export const ModalidadeUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(ModalidadeFindOneByIdInputValidationContract())
      .concat(ModalidadeInputDtoValidationContract().partial())
      .shape({})
  );
});

// ======================================================

@InputType('ModalidadeUpdateInputDto')
export class ModalidadeUpdateInputDto implements IModalidadeUpdateDto {
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
  id!: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_NOME, { required: false })
  nome?: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_SLUG, { required: false })
  slug?: string;
}

export class ModalidadeUpdateWithoutIdInputDto extends OmitType(ModalidadeUpdateInputDto, ['id'] as const) {}

// ======================================================

export const MODALIDADE_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de uma modalidade.',

  gql: {
    name: 'modalidadeUpdate',

    inputDtoType: () => ModalidadeUpdateInputDto,
    inputDtoValidationContract: ModalidadeUpdateInputDtoValidationContract,

    returnType: () => ModalidadeDto,
  },

  swagger: {
    inputBodyType: ModalidadeUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => ModalidadeUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID da modalidade.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: ModalidadeFindOneResultDto,
  },
});

// ======================================================
