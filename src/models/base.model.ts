import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Base extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
    default: () => new Date()
  })
  created_at?: string;

  // TODO: Auto on modified row to updated_at
  @property({
    type: 'date',
    default: () => new Date()
  })
  updated_at?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Base>) {
    super(data);
  }
}
