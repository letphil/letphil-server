
  // Controller for Items service
  import BaseController from '../../core/controllers/base.controller';
  import Items from './items.model';
  
  class ItemsController extends BaseController {
    constructor() {
      super(Items);
    }
  }
  
  const itemsController = new ItemsController();
  
  export default itemsController;
  