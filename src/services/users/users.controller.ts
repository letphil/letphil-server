
  // Controller for Users service
  import BaseController from '../../core/base.controller';
  import Users from './users.model';
  
  class UsersController extends BaseController {
    constructor() {
      super(Users);
    }
  }
  
  const usersController = new UsersController();
  
  export default usersController;
  