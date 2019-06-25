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
import {Mirror} from '../models';
import {MirrorRepository} from '../repositories';
import {authenticate, UserProfile } from '@loopback/authentication';

export class MirrorController {
  constructor(
    @repository(MirrorRepository)
    public mirrorRepository : MirrorRepository,
  ) {}

  @post('/mirrors', {
    responses: {
      '200': {
        description: 'Mirror model instance',
        content: {'application/json': {schema: {'x-ts-type': Mirror}}},
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() mirror: Mirror): Promise<Mirror> {
    return await this.mirrorRepository.create(mirror);
  }

  @get('/mirrors/count', {
    responses: {
      '200': {
        description: 'Mirror model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Mirror)) where?: Where,
  ): Promise<Count> {
    return await this.mirrorRepository.count(where);
  }

  @get('/mirrors', {
    responses: {
      '200': {
        description: 'Array of Mirror model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Mirror}},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Mirror)) filter?: Filter,
  ): Promise<Mirror[]> {
    return await this.mirrorRepository.find(filter);
  }

  @patch('/mirrors', {
    responses: {
      '200': {
        description: 'Mirror PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() mirror: Mirror,
    @param.query.object('where', getWhereSchemaFor(Mirror)) where?: Where,
  ): Promise<Count> {
    return await this.mirrorRepository.updateAll(mirror, where);
  }

  @get('/mirrors/{id}', {
    responses: {
      '200': {
        description: 'Mirror model instance',
        content: {'application/json': {schema: {'x-ts-type': Mirror}}},
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.number('id') id: number): Promise<Mirror> {
    return await this.mirrorRepository.findById(id);
  }

  @patch('/mirrors/{id}', {
    responses: {
      '204': {
        description: 'Mirror PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() mirror: Mirror,
  ): Promise<void> {
    await this.mirrorRepository.updateById(id, mirror);
  }

  @put('/mirrors/{id}', {
    responses: {
      '204': {
        description: 'Mirror PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mirror: Mirror,
  ): Promise<void> {
    await this.mirrorRepository.replaceById(id, mirror);
  }

  @del('/mirrors/{id}', {
    responses: {
      '204': {
        description: 'Mirror DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mirrorRepository.deleteById(id);
  }
}
