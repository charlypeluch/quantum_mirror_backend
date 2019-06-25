import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Modules} from '../models';
import {ModulesRepository} from '../repositories';

export class ModuleController {
  constructor(
    @repository(ModulesRepository)
    public modulesRepository : ModulesRepository,
  ) {}

  @post('/modules', {
    responses: {
      '200': {
        description: 'Modules model instance',
        content: {'application/json': {schema: {'x-ts-type': Modules}}},
      },
    },
  })
  async create(@requestBody() modules: Modules): Promise<Modules> {
    return await this.modulesRepository.create(modules);
  }

  @get('/modules/count', {
    responses: {
      '200': {
        description: 'Modules model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Modules)) where?: Where,
  ): Promise<Count> {
    return await this.modulesRepository.count(where);
  }

  @get('/modules', {
    responses: {
      '200': {
        description: 'Array of Modules model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Modules}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Modules)) filter?: Filter,
  ): Promise<Modules[]> {
    return await this.modulesRepository.find(filter);
  }

  @patch('/modules', {
    responses: {
      '200': {
        description: 'Modules PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() modules: Modules,
    @param.query.object('where', getWhereSchemaFor(Modules)) where?: Where,
  ): Promise<Count> {
    return await this.modulesRepository.updateAll(modules, where);
  }

  @get('/modules/{id}', {
    responses: {
      '200': {
        description: 'Modules model instance',
        content: {'application/json': {schema: {'x-ts-type': Modules}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Modules> {
    return await this.modulesRepository.findById(id);
  }

  @patch('/modules/{id}', {
    responses: {
      '204': {
        description: 'Modules PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() modules: Modules,
  ): Promise<void> {
    await this.modulesRepository.updateById(id, modules);
  }

  @put('/modules/{id}', {
    responses: {
      '204': {
        description: 'Modules PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() modules: Modules,
  ): Promise<void> {
    await this.modulesRepository.replaceById(id, modules);
  }

  @del('/modules/{id}', {
    responses: {
      '204': {
        description: 'Modules DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.modulesRepository.deleteById(id);
  }
}
