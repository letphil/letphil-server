abstract class BaseController {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }
}

export default BaseController;
