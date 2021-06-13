import { Repository, EntityRepository } from 'typeorm';
import { Owner } from '@entities/Owner';

@EntityRepository(Owner)
class OwnerRepository extends Repository<Owner> {}

export { OwnerRepository };
