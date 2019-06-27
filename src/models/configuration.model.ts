import {model, property} from '@loopback/repository';
import {Base} from '.';

@model({settings: {"strict":false}})
export class Configuration extends Base {
  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'number',
  })
  mirror_id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    default: 0,
  })
  session_expiration?: number;

  @property({
    type: 'number',
  })
  module_ne?: number;

  @property({
    type: 'number',
  })
  module_se?: number;

  @property({
    type: 'number',
  })
  module_so?: number;

  @property({
    type: 'number',
  })
  module_no?: number;

  @property({
    type: 'object',
  })
  module_ne_conf?: object;

  @property({
    type: 'object',
  })
  module_se_conf?: object;

  @property({
    type: 'object',
  })
  module_so_conf?: object;

  @property({
    type: 'object',
  })
  module_no_conf?: object;

  @property({
    type: 'boolean',
    default: true,
  })
  is_global?: boolean;


  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Configuration>) {
    super(data);
  }
}
