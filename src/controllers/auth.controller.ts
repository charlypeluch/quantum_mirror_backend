import {inject} from '@loopback/core';
import {get, post,requestBody} from '@loopback/rest';
import {authenticate, UserProfile } from '@loopback/authentication';
import {
  CredentialsRequestBody,
  CredentialsRequestMirrorBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import {Credentials} from '../repositories/user.repository';
import {JWTAuthenticationBindings} from '../keys';
import {JWTAuthenticationService} from '../services/JWT.authentication.service';
import {validateCredentials} from '../services/JWT.authentication.service';

export class AuthController {
  constructor(
    @inject(JWTAuthenticationBindings.SERVICE)
    public jwtAuthenticationService: JWTAuthenticationService,
  ) {}

  @post('/auth', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })

  // @authenticate('jwt', {action: 'generateAccessToken'})
  async auth(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    validateCredentials(credentials);
    const token = await this.jwtAuthenticationService.getAccessTokenForUser(
      credentials,
    );
    return {token};
  }

  @post('/auth-mirror', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'string',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })

  // @authenticate('jwt', {action: 'generateAccessToken'})
  async authMirror(
    @requestBody(CredentialsRequestMirrorBody) pattern: string,
  ): Promise<{token: string}> {
    const token = await this.jwtAuthenticationService.getAccessTokenForMirror(
      pattern,
    );
    return {token};
  }

  @get('/auth/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject('authentication.currentUser') user: UserProfile,
  ): Promise < UserProfile > {
    return user;
  }
}
