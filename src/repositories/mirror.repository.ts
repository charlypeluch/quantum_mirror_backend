import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {DbDataSource} from '../datasources';
import {User, Mirror, MirrorsUsers} from '../models';
import {UserRepository, MirrorsUsersRepository} from '../repositories';

export class MirrorRepository extends DefaultCrudRepository<
  Mirror,
  typeof Mirror.prototype.id
> {
  public readonly users: HasManyThroughRepositoryFactory<
    User,
    MirrorsUsers,
    typeof Mirror.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    getUserRepository: Getter<UserRepository>,
    @repository.getter('MirrorsUsersRepository')
    getMirrorsUsersRepository: Getter<MirrorsUsersRepository>,
  ) {
    super(Mirror, dataSource);
    this.users = this.createHasManyThroughRepositoryFactoryFor(
      'users',
      getUserRepository,
      getMirrorsUsersRepository
    );
  }
}
