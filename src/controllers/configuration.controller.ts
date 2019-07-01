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
import {inject} from '@loopback/core';
import {authenticate, UserProfile } from '@loopback/authentication';
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
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
  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.configurationRepository.deleteById(id);
  }

  @get('/configurations/user', {
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
  @authenticate('jwt')
  async findByUser(
    @inject('authentication.currentUser') user: UserProfile,
  ): Promise<Configuration[]> {
    return await this.configurationRepository.find({where: {user_id: user.id}});
  }
}
