// Controller for Cars service
import BaseController from '../../core/controllers/base.controller';
import Cars from './cars.model';

class CarsController extends BaseController {
  constructor() {
    super(Cars);
  }
}

const carsController = new CarsController();

export default carsController;
  