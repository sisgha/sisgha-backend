import { Injectable, NotFoundException } from '@nestjs/common';
import { has, map, pick } from 'lodash';
import { FilterOperator, paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { getPaginateQueryFromSearchInput } from '../../../../infrastructure';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { CalendarioLetivoEntity } from '../../../../infrastructure/integrate-database/typeorm/entities/calendario/calendario-letivo.entity';
import { paginateConfig } from '../../../../infrastructure/utils/paginateConfig';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { IModalidadeQueryBuilderViewOptions, ModalidadeService } from '../../ensino/modalidade/modalidade.service';

// ============================================================================

const aliasCalendarioLetivo = 'calendarioLetivo';

// ============================================================================

export type ICalendarioLetivoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadModalidade?: IQueryBuilderViewOptionsLoad<IModalidadeQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class CalendarioLetivoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private modalidadeService: ModalidadeService,
  ) {}

  get calendarioLetivoRepository() {
    return this.databaseContext.calendarioLetivoRepository;
  }

  //

  static CalendarioLetivoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICalendarioLetivoQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.ano`,
    ]);

    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_campus`);

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }

    const loadModalidade = getQueryBuilderViewLoadMeta(options.loadModalidade, true, `${alias}_modalidade`);

    if (loadModalidade) {
      qb.innerJoin(`${alias}.modalidade`, `${loadModalidade.alias}`);
      ModalidadeService.ModalidadeQueryBuilderView(loadModalidade.alias, qb, loadModalidade.options);
    }
  }

  //

  async calendarioLetivoFindAll(clientAccess: IClientAccess, dto?: Dtos.ISearchInputDto): Promise<Dtos.ICalendarioLetivoFindAllResultDto> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await clientAccess.applyFilter('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'ano',
        'campus',
        'modalidade',
        //
        'campus.id',
        'campus.cnpj',
        'campus.razaoSocial',
        'campus.nomeFantasia',
        //
        'modalidade.id',
        'modalidade.nome',
        'modalidade.slug',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'ano',
        //
        'campus.id',
        'campus.cnpj',
        'campus.razaoSocial',
        'campus.nomeFantasia',
        //
        'modalidade.id',
        'modalidade.nome',
        'modalidade.slug',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'ano',
        'campus',
        'modalidade',
        //
      ],
      relations: {
        campus: true,
        modalidade: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        'campus.id': [FilterOperator.EQ],
        'campus.cnpj': [FilterOperator.EQ],
        'campus.razaoSocial': [FilterOperator.EQ],
        'campus.nomeFantasia': [FilterOperator.EQ],
        'modalidade.id': [FilterOperator.EQ],
        'modalidade.nome': [FilterOperator.EQ],
        'modalidade.slug': [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {});

    // =========================================================

    paginated.data = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();

    // =========================================================

    return paginated;
  }

  async caledarioLetivoFindById(clientAccess: IClientAccess, dto: Dtos.ICalendarioLetivoFindOneByIdInputDto): Promise<Dtos.ICalendarioLetivoFindOneResultDto | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await clientAccess.applyFilter('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {});

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.ICalendarioLetivoFindOneByIdInputDto) {
    const calendarioLetivo = await this.caledarioLetivoFindById(clientAccess, dto);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.ICalendarioLetivoFindOneByIdInputDto['id'],
    options?: ICalendarioLetivoQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.ICalendarioLetivoFindOneResultDto | null> {
    // =========================================================

    const qb = this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo);

    // =========================================================

    await clientAccess.applyFilter('calendario_letivo:find', qb, aliasCalendarioLetivo, null);

    // =========================================================

    qb.andWhere(`${aliasCalendarioLetivo}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    CalendarioLetivoService.CalendarioLetivoQueryBuilderView(aliasCalendarioLetivo, qb, {
      ...options,
    });

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const calendarioLetivo = await qb.getOne();

    // =========================================================

    return calendarioLetivo;
  }

  async CalendarioLetivoFindByIdSimpleStrict(
    clientAccess: IClientAccess,
    id: Dtos.ICalendarioLetivoFindOneByIdInputDto['id'],
    options?: ICalendarioLetivoQueryBuilderViewOptions,
    selection?: string[],
  ) {
    const calendarioLetivo = await this.calendarioLetivoFindByIdSimple(clientAccess, id, options, selection);

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  //

  async calendarioLetivoCreate(clientAccess: IClientAccess, dto: Dtos.ICalendarioLetivoInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('calendario_letivo:create', { dto });

    // =========================================================

    const dtoCalendarioLetivo = pick(dto, ['nome', 'ano']);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(clientAccess, dto.modalidade.id);

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      modalidade: {
        id: modalidade.id,
      },
    });

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(clientAccess, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(clientAccess: IClientAccess, dto: Dtos.ICalendarioLetivoUpdateDto) {
    // =========================================================

    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    // =========================================================

    await clientAccess.ensureCanReach('calendario_letivo:update', { dto }, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo), dto.id);

    const dtoCalendarioLetivo = pick(dto, ['nome', 'ano']);

    const calendarioLetivo = <CalendarioLetivoEntity>{
      id: currentCalendarioLetivo.id,
    };

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    // =========================================================

    if (has(dto, 'campus') && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(clientAccess, dto.campus.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    // =========================================================

    if (has(dto, 'modalidade') && dto.modalidade !== undefined) {
      const modalidade = await this.modalidadeService.modalidadeFindByIdSimpleStrict(clientAccess, dto.modalidade.id);

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        modalidade: {
          id: modalidade.id,
        },
      });
    }

    // =========================================================

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    // =========================================================

    return this.calendarioLetivoFindByIdStrict(clientAccess, { id: calendarioLetivo.id });
  }

  //

  async calendarioLetivoDeleteOneById(clientAccess: IClientAccess, dto: Dtos.ICalendarioLetivoDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('calendario_letivo:delete', { dto }, this.calendarioLetivoRepository.createQueryBuilder(aliasCalendarioLetivo), dto.id);

    // =========================================================

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(clientAccess, dto);

    // =========================================================

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository
        .createQueryBuilder(aliasCalendarioLetivo)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :calendarioLetivoId', { calendarioLetivoId: calendarioLetivo.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
