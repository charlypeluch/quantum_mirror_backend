import {DefaultCrudRepository} from '@loopback/repository';
import {MirrorsUsers} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MirrorsUsersRepository extends DefaultCrudRepository<
  MirrorsUsers,
  typeof MirrorsUsers.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MirrorsUsers, dataSource);
  }
}
