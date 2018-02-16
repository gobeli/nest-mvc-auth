(() => {
  class MessageController extends Stimulus.Controller {
    initialize() {
      setTimeout(this.remove.bind(this), 4000);
    }
    
    remove() {
      this.context.element.classList.add('fadeOutRight');
    }
  }
  const application = Stimulus.Application.start();
  application.register('message', MessageController)
})();
