import { Request, Response } from 'express';
import { ExpenseService } from '@services/ExpenseService';

export class ExpenseController {
  async index(request: Request, response: Response) {
    const expenseService = new ExpenseService();
    const expenses = await expenseService.index();

    return response.json(expenses);
  }

  async store(request: Request, response: Response) {
    const { owner_id, price, purchase_date, purchase_place } = request.body;
    const expenseService = new ExpenseService();

    const [day, year, month] = purchase_date.split('/');

    try {
      const expense = await expenseService.create({
        owner_id,
        price,
        purchase_date: new Date(`${month}/${day}/${year}`),
        purchase_place,
      });
      return response.json(expense);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const expenseService = new ExpenseService();

    try {
      const expense = await expenseService.show({ id });
      return response.json(expense);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const expenseService = new ExpenseService();

    try {
      const expense = await expenseService.update({ id, ...request.body });
      return response.json(expense);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    const expenseService = new ExpenseService();

    try {
      await expenseService.delete({ id });
      return response.json();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}
