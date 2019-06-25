import {DefaultCrudRepository} from '@loopback/repository';
import {Modules} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ModulesRepository extends DefaultCrudRepository<
  Modules,
  typeof Modules.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Modules, dataSource);
  }
}
