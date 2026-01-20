// Controller for Users service
import BaseController from '../../core/controllers/base.controller';
import Users from './user.model';

class UsersController extends BaseController {
  constructor() {
    super(Users);
  }
}

const usersController = new UsersController();

export default usersController;
  