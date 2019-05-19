import {model, belongsTo} from '@loopback/repository';
import {Base, Mirror, User} from '.';

@model({settings: {"strict":false}})
export class MirrorsUsers extends Base {

  // Relations
  @belongsTo(() => Mirror)
  mirrorId: number;

  @belongsTo(() => User)
  userId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<MirrorsUsers>) {
    super(data);
  }
}

// @model()
// export class MirrorsUsers extends Entity {
//
//   @property({
//     type: 'string',
//     id: true
//   })
//   id?: string;
//
//   // Relations
//   @belongsTo(() => Mirror)
//   mirrors: string;
//
//   @belongsTo(() => User)
//   users: string;
//
//   constructor(data?: Partial<MirrorsUsers>) {
//     super(data);
//   }
// }
