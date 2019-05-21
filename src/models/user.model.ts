import {model, property, hasMany} from '@loopback/repository';
import {Base, Mirror, MirrorsUsers} from '.';

@model({settings: {"strict":false}})
export class User extends Base {
  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    unique: true,
  })
  alias?: string;

  @property({
    type: 'number'
  })
  pattern?: number;

  @property({
    type: 'string'
  })
  facial?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  // Relations
  @hasMany(() => Mirror, { through: () => MirrorsUsers })
  mirrors?: Mirror[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}
