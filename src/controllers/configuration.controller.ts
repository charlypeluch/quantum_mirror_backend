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
import {Configuration} from '../models';
import {ConfigurationRepository} from '../repositories';

export class ConfigurationController {
  constructor(
    @repository(ConfigurationRepository)
    public configurationRepository : ConfigurationRepository,
  ) {}

  @post('/configurations', {
    responses: {
      '200': {
        description: 'Configuration model instance',
        content: {'application/json': {schema: {'x-ts-type': Configuration}}},
      },
    },
  })
  async create(@requestBody() configuration: Configuration): Promise<Configuration> {
    return await this.configurationRepository.create(configuration);
  }

  @get('/configurations/count', {
    responses: {
      '200': {
        description: 'Configuration model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Configuration)) where?: Where,
  ): Promise<Count> {
    return await this.configurationRepository.count(where);
  }

  @get('/configurations', {
    responses: {
      '200': {
        description: 'Array of Configuration model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Configuration}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Configuration)) filter?: Filter,
  ): Promise<Configuration[]> {
    return await this.configurationRepository.find(filter);
  }

  @patch('/configurations', {
    responses: {
      '200': {
        description: 'Configuration PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() configuration: Configuration,
    @param.query.object('where', getWhereSchemaFor(Configuration)) where?: Where,
  ): Promise<Count> {
    return await this.configurationRepository.updateAll(configuration, where);
  }

  @get('/configurations/{id}', {
    responses: {
      '200': {
        description: 'Configuration model instance',
        content: {'application/json': {schema: {'x-ts-type': Configuration}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Configuration> {
    return await this.configurationRepository.findById(id);
  }

  @patch('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configuration PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() configuration: Configuration,
  ): Promise<void> {
    await this.configurationRepository.updateById(id, configuration);
  }

  @put('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configuration PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() configuration: Configuration,
  ): Promise<void> {
    await this.configurationRepository.replaceById(id, configuration);
  }

  @del('/configurations/{id}', {
    responses: {
      '204': {
        description: 'Configuration DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.configurationRepository.deleteById(id);
  }
}
