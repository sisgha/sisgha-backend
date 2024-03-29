import { Injectable, NotFoundException } from '@nestjs/common';
import { paginateConfig } from 'infrastructure/utils/paginateConfig';
import { map } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dto from '../../(spec)';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto } from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';

export interface IEstadoQueryBuilderViewOptions {}

const aliasEstado = 'estado';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.estadoRepository;
  }

  //

  static EstadoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>) {
    qb.addSelect([`${alias}.id`, `${alias}.nome`, `${alias}.sigla`]);
  }

  //

  async findAll(clienteAccess: IClientAccess, dto?: Dto.ISearchInputDto): Promise<Dto.IEstadoFindAllResultDto> {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: ['id'],
      searchableColumns: ['nome', 'sigla'],
      sortableColumns: ['id', 'nome', 'sigla'],
      defaultSortBy: [['nome', 'ASC']],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async findByUf(clienteAccess: IClientAccess, dto: IEstadoFindOneByUfInputDto) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.sigla = :sigla`, { sigla: dto.uf.toUpperCase() });

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(clienteAccess: IClientAccess, dto: IEstadoFindOneByUfInputDto) {
    const estado = await this.findByUf(clienteAccess, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(clienteAccess: IClientAccess, dto: IEstadoFindOneByIdInputDto) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(clienteAccess: IClientAccess, dto: IEstadoFindOneByIdInputDto) {
    const estado = await this.findById(clienteAccess, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
