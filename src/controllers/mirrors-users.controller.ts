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
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {authenticate, UserProfile } from '@loopback/authentication';
import {MirrorsUsers, Mirror, User} from '../models';
import {MirrorCodeRequestBody} from './specs/user-controller.specs';
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
  @authenticate('jwt')
  async findMirrorUsers(
    @param.path.string('mirrorId') mirrorId: number,
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter
  ): Promise<User[]> {
    return await this.mirrorRepository.users(mirrorId).find(filter);
  }


  @get('/user/mirrors', {
    responses: {
      '200': {
        description: 'Array of Mirror model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Mirror } }
          }
        }
      }
    }
  })
  @authenticate('jwt')
  async findUserMirrors(
    @inject('authentication.currentUser') user: UserProfile,
    @param.query.object('filter', getFilterSchemaFor(Mirror)) filter?: Filter
  ): Promise<Mirror[]> {
    return await this.userRepository.mirrors(parseInt(user.id)).find(filter);
  }


  @post('/user/mirrors', {
    responses: {
      '200': {
        description: 'Assign new mirror to user Model',
        content: {
          'application/json': {
            schema: {
              type: 'boolean',
              properties: {
                result: {
                  type: 'boolean',
                },
              },
            }
          }
        },
      },
    },
  })

  @authenticate('jwt')
  async assignUserMirror(
    @inject('authentication.currentUser') user: UserProfile,
    @requestBody(MirrorCodeRequestBody) data: any): Promise<Boolean> {
    const mirror = await this.mirrorRepository.findOne({where: {code: data.code}});
    if (!mirror)
      throw new HttpErrors['NotFound'](`Mirror code ${data.code} not found`);

    const user_mirror = await this.mirrorsUsersRepository.findOne({where: {userId: user.id, mirrorId: mirror.id}});
    if (user_mirror)
      throw new HttpErrors['NotFound'](`Mirror name [${mirror.name}] already asigned in user ${user.name}`);

    let _data = new MirrorsUsers({userId: parseInt(user.id), mirrorId: mirror.id});
    this.mirrorsUsersRepository.create(_data);

    return true;
  }

  @del('/user/mirrors/{mirrorId}', {
    responses: {
      '204': {
        description: 'MirrorsUsers DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async unassignUserMirror(
    @inject('authentication.currentUser') user: UserProfile,
    @param.path.number('mirrorId') mirrorId: number
  ): Promise<void> {
    await this.mirrorsUsersRepository.deleteAll({userId: user.id, mirrorId: mirrorId});
  }
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
