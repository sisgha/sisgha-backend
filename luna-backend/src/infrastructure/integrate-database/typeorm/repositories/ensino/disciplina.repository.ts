import { DisciplinaEntity } from '../../entities/ensino/disciplina.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createDisciplinaRepository = createRepositoryFactory((ds) => ds.getRepository(DisciplinaEntity).extend({
    
}));

export type DisciplinaRepository = IRepositoryFactoryOutput<typeof createDisciplinaRepository>;
