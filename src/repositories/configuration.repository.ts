import {DefaultCrudRepository} from '@loopback/repository';
import {Configuration} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConfigurationRepository extends DefaultCrudRepository<
  Configuration,
  typeof Configuration.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Configuration, dataSource);
  }
}
