import { inject } from '@loopback/core';
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
  Request,
  Response,
  HttpErrors,
  RestBindings,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
// import {Credentials} from '../repositories/user.repository';
import {PasswordHasher} from '../services/hash.password.bcryptjs';
import {PasswordHasherBindings} from '../keys';
import {JWTAuthenticationService, validateCredentials } from '../services/JWT.authentication.service';
import {authenticate } from '@loopback/authentication';
import * as multer from 'multer';
import * as _ from 'lodash';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHahser: PasswordHasher
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  // async create(@requestBody() user: User): Promise<User> {
  //   return await this.userRepository.create(user);
  // }
  async create(@requestBody() user: User): Promise<User> {
    validateCredentials(_.pick(user, ['email', 'password']));
    user.password = await this.passwordHahser.hashPassword(user.password);

    // Check credentials no repeat
    const foundUser = await this.userRepository.findOne({where: {email: user.email}});
    if (foundUser)
      throw new HttpErrors['NotFound'](`User email ${user.email} already exist`);

    // Save & Return Result
    const savedUser = await this.userRepository.create(user);
    delete savedUser.password;
    return savedUser;
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': User}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
        content: { 'application/json':
          {
            schema: {
              type: 'object', properties: {
                id: {type: 'number'},
                is_udpdate: {type: 'boolean'}
              },
            },
          },
        },
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<any> {
    await this.userRepository.updateById(id, user);
    return {'id': id, 'is_update': true};
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  // Upload profile facial image
  // https://stackoverflow.com/questions/53102928/loopback-4-upload-multipart-form-data-via-post-method?rq=1
  @post('/users/facial/{id}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Upload facial',
      },
    },
  })
  async uploadFacial(
    @param.path.number('id') id: number,
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: {type: 'object'},
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Object> {
    // const storage = multer.memoryStorage();
    var _filename = '';
    var storage = await multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/tmp/quantum-mirror-data')
      },
      filename: function (req, file, cb) {
        _filename = file.fieldname + '-' + Date.now();
        cb(null, _filename);
      }
    })
    const upload = multer({storage: storage});
    return new Promise<object>((resolve, reject) => {
      upload.any()(request, response, err => {
        // var _user = new User({facial: request.files[0].path});
        // this.userRepository.updateById(id, _user);

        if (err) return reject(err);
        resolve({
          files: request.files,
          // fields: (request as any).fields,
          fields: request.body
        });
      });
    });
  }
}
