class EntityController extends Stimulus.Controller {
  constructor(entityName) {
    super();
    this.entityName = entityName;
  }

  findId($el) {
    if (!$el.parentNode) {
      throw 'Entity id not found';
    } else if ($el.dataset.id) {
      return $el.dataset.id;
    } 
    return this.findId($el.parentNode);
  } 

  async remove(event) {
    const id = this.findId(event.target);
    await fetch(`/${this.entityName}/${id}`, { 
        method: 'delete', 
        credentials: 'include',
    });
    window.location.reload();
  }
}
