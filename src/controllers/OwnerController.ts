import { Request, Response } from 'express';
import { OwnerService } from '@services/OwnerService';

class OwnerController {
  async index(request: Request, response: Response) {
    const ownerService = new OwnerService();
    const owners = await ownerService.index();

    return response.json(owners);
  }

  async store(request: Request, response: Response) {
    const { name, phone } = request.body;
    const ownerService = new OwnerService();

    try {
      const owner = await ownerService.create({ name, phone });
      return response.json(owner);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export { OwnerController };
