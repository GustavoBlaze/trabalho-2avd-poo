import { getCustomRepository } from 'typeorm';
import { OwnerRepository } from '@repositories/OwnerRepository';

interface IOwnerCreate {
  name: string;
  phone: string;
}

interface IOwnerShow {
  id: string;
}

interface IOwnerDelete extends IOwnerShow {}

interface IOwnerUpdate {
  id: string;
  name?: string;
  phone?: string;
}

export class OwnerService {
  async create({ name, phone }: IOwnerCreate) {
    const repository = getCustomRepository(OwnerRepository);
    const owner = repository.create({ name, phone });

    await repository.save(owner);

    return owner;
  }

  async index() {
    const repository = getCustomRepository(OwnerRepository);
    const owners = await repository.find({
      relations: ['expenses'],
    });

    return owners;
  }

  async show({ id }: IOwnerShow) {
    const repository = getCustomRepository(OwnerRepository);
    const owner = await repository.findOne({ id });

    return owner;
  }

  async delete({ id }: IOwnerDelete) {
    const repository = getCustomRepository(OwnerRepository);
    const owner = await repository.findOne({ id });

    if (!owner) {
      throw new Error('Owner id not found!');
    }

    return await repository.delete({ id });
  }

  async update({ id, name, phone }: IOwnerUpdate) {
    const repository = getCustomRepository(OwnerRepository);
    const owner = await repository.findOne({ id });

    if (!owner) {
      throw new Error('Owner not found!');
    }

    await repository.update({ id }, { name, phone });
  }
}
