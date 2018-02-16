(() => {
  class UserController extends EntityController {
    constructor() {
      super('user');
    }
  }

  const application = Stimulus.Application.start();
  application.register('user', UserController)
})();
