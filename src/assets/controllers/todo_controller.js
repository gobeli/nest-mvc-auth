(() => {
  class TodoController extends EntityController {
    constructor() {
      super('todo');
    }
  }

  const application = Stimulus.Application.start();
  application.register('todo', TodoController)
})();
