import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository, juggler} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';
import {DbDataSource} from '../datasources';
import {User, Mirror, MirrorsUsers} from '../models';
import {MirrorRepository, MirrorsUsersRepository} from '../repositories';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly mirrors: HasManyThroughRepositoryFactory<
    Mirror,
    MirrorsUsers,
    typeof User.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('MirrorRepository')
    getMirrorRepository: Getter<MirrorRepository>,
    @repository.getter('MirrorsUsersRepository')
    getMirrorsUsersRepository: Getter<MirrorsUsersRepository>,
  ) {
    super(User, dataSource);
    this.mirrors = this.createHasManyThroughRepositoryFactoryFor(
      'mirrors',
      getMirrorRepository,
      getMirrorsUsersRepository
    );
  }

  // TODO: Hidden properties functionality > https://github.com/strongloop/loopback-next/issues/1914
  protected toEntity(model: juggler.PersistedModel): User {
    const r = super.toEntity(model);
    // r.password = '*****';
    // delete r.password;
    return r;
  }
}
