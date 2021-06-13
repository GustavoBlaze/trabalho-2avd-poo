import { getCustomRepository } from 'typeorm';
import { ExpenseRepository } from '@repositories/ExpenseRepository';
import { OwnerRepository } from '@repositories/OwnerRepository';

interface IExpenseCreate {
  purchase_date: Date;
  purchase_place: string;
  price: number;
  owner_id: string;
}

interface IExpenseShow {
  id: string;
}

interface IExpenseDelete extends IExpenseShow {}

interface IExpenseUpdate {
  id: string;
  purchase_date?: Date;
  purchase_place?: string;
  price?: number;
  owner_id?: string;
}

export class ExpenseService {
  async create({
    purchase_date,
    purchase_place,
    price,
    owner_id,
  }: IExpenseCreate) {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    const ownerRepository = getCustomRepository(OwnerRepository);

    const owner = await ownerRepository.find({ id: owner_id });

    if (!owner) {
      throw new Error('Owner not found!');
    }

    const expense = expenseRepository.create({
      purchase_date,
      purchase_place,
      price,
      owner_id,
    });

    await expenseRepository.save(expense);

    return expense;
  }

  async index() {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    const expenses = await expenseRepository.find({
      relations: ['owner'],
    });

    return expenses;
  }

  async show({ id }: IExpenseShow) {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    const expense = await expenseRepository.findOne(
      {
        id,
      },
      {
        relations: ['owner'],
      }
    );

    return expense;
  }

  async delete({ id }: IExpenseDelete) {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    const expense = await expenseRepository.findOne({ id });

    if (!expense) {
      throw new Error('Expense not found!');
    }

    return await expenseRepository.delete({ id });
  }

  async update({ id, ...data }: IExpenseUpdate) {
    const expenseRepository = getCustomRepository(ExpenseRepository);
    const expense = await expenseRepository.findOne({ id });

    if (!expense) {
      throw new Error('Expense not found!');
    }

    await expenseRepository.update({ id }, { ...data });

    return await expenseRepository.findOne({ id });
  }
}
