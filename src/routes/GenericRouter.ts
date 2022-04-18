import { Router } from 'express';
import GenericController from '../controllers/GenericController';

class GenericRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
  }
}

export default GenericRouter;