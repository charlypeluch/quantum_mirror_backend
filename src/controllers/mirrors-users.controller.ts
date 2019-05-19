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
import {MirrorsUsers, Mirror, User} from '../models';
import {MirrorsUsersRepository, MirrorRepository, UserRepository} from '../repositories';

export class MirrorsUsersController {
  constructor(
    @repository(MirrorsUsersRepository)
    public mirrorsUsersRepository : MirrorsUsersRepository,
    @repository('MirrorRepository')
    public mirrorRepository: MirrorRepository,
    @repository('UserRepository')
    public userRepository: UserRepository,
  ) {}

  @get('/mirrors/{mirrorId}/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } }
          }
        }
      }
    }
  })
  async find(
    @param.path.string('mirrorId') mirrorId: number,
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter
  ): Promise<User[]> {
    return await this.mirrorRepository.users(mirrorId).find(filter);
  }


  // @post('/mirrors', {
  //   responses: {
  //     '200': {
  //       description: 'MirrorsUsers model instance',
  //       content: {'application/json': {schema: {'x-ts-type': MirrorsUsers}}},
  //     },
  //   },
  // })
  // async create(@requestBody() mirrorsUsers: MirrorsUsers): Promise<MirrorsUsers> {
  //   return await this.mirrorsUsersRepository.create(mirrorsUsers);
  // }
  //
  // @get('/mirrors/count', {
  //   responses: {
  //     '200': {
  //       description: 'MirrorsUsers model count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async count(
  //   @param.query.object('where', getWhereSchemaFor(MirrorsUsers)) where?: Where,
  // ): Promise<Count> {
  //   return await this.mirrorsUsersRepository.count(where);
  // }
  //
  // @get('/mirrors', {
  //   responses: {
  //     '200': {
  //       description: 'Array of MirrorsUsers model instances',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: {'x-ts-type': MirrorsUsers}},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.query.object('filter', getFilterSchemaFor(MirrorsUsers)) filter?: Filter,
  // ): Promise<MirrorsUsers[]> {
  //   return await this.mirrorsUsersRepository.find(filter);
  // }
  //
  // @patch('/mirrors', {
  //   responses: {
  //     '200': {
  //       description: 'MirrorsUsers PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async updateAll(
  //   @requestBody() mirrorsUsers: MirrorsUsers,
  //   @param.query.object('where', getWhereSchemaFor(MirrorsUsers)) where?: Where,
  // ): Promise<Count> {
  //   return await this.mirrorsUsersRepository.updateAll(mirrorsUsers, where);
  // }
  //
  // @get('/mirrors/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'MirrorsUsers model instance',
  //       content: {'application/json': {schema: {'x-ts-type': MirrorsUsers}}},
  //     },
  //   },
  // })
  // async findById(@param.path.number('id') id: number): Promise<MirrorsUsers> {
  //   return await this.mirrorsUsersRepository.findById(id);
  // }
  //
  // @patch('/mirrors/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'MirrorsUsers PATCH success',
  //     },
  //   },
  // })
  // async updateById(
  //   @param.path.number('id') id: number,
  //   @requestBody() mirrorsUsers: MirrorsUsers,
  // ): Promise<void> {
  //   await this.mirrorsUsersRepository.updateById(id, mirrorsUsers);
  // }
  //
  // @put('/mirrors/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'MirrorsUsers PUT success',
  //     },
  //   },
  // })
  // async replaceById(
  //   @param.path.number('id') id: number,
  //   @requestBody() mirrorsUsers: MirrorsUsers,
  // ): Promise<void> {
  //   await this.mirrorsUsersRepository.replaceById(id, mirrorsUsers);
  // }
  //
  // @del('/mirrors/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'MirrorsUsers DELETE success',
  //     },
  //   },
  // })
  // async deleteById(@param.path.number('id') id: number): Promise<void> {
  //   await this.mirrorsUsersRepository.deleteById(id);
  // }
}
