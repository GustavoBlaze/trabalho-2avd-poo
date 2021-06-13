import { Router } from 'express';

import { OwnerController } from '@controllers/OwnerController';
import { ExpenseController } from '@controllers/ExpenseController';

const routes = Router();
const [ownerController, expenseController] = [
  new OwnerController(),
  new ExpenseController(),
];

routes.get('/responsaveis', ownerController.index);
routes.post('/responsaveis', ownerController.store);

routes.get('/despesas', expenseController.index);
routes.get('/despesas/:id', expenseController.show);
routes.put('/despesas/:id', expenseController.update);
routes.delete('/despesas/:id', expenseController.destroy);
routes.post('/despesas', expenseController.store);

export { routes };
