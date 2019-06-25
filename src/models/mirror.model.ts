import {model, property, hasMany} from '@loopback/repository';
import {Base, MirrorsUsers, User} from '.';

@model({settings: {"strict":false}})
export class Mirror extends Base {
  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  is_active: boolean;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  is_shared: boolean;

  // Relations
  @hasMany(() => User, { through: () => MirrorsUsers })
  users: User[];
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Mirror>) {
    super(data);
  }
}
