import { Repository, EntityRepository } from 'typeorm';
import { Expense } from '@entities/Expense';

@EntityRepository(Expense)
class ExpenseRepository extends Repository<Expense> {}

export { ExpenseRepository };
