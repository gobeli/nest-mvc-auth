import { Get, Controller, Post, Res, Req, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { UserService } from '../shared/auth/user.service';
import { AuthGuard } from '../shared/auth/auth.guard';
import { CrudController } from '../shared/crud.controller';
import { ENTITIES } from '../app.constants';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController extends CrudController<Todo> {
  constructor(private readonly todoService: TodoService, private readonly userService: UserService) {
    super(ENTITIES.todo, todoService, Todo);
  }

	@Get('')
	async index(@Req() req, @Res() res): Promise<void> {
    const todos = await this.todoService.findByOwner(req.session.userId);
    res.render('todo/index', { todos: todos || [] });
  }

  @Post('')
  async add(@Body('text') text, @Req() req, @Res() res): Promise<void> {
    if (!text) {
      req.session.flash = { type: 'error', message: 'Text cannot be empty' };
    } else {
      await this.todoService.save(<Todo>{ text, owner: await this.userService.findById(req.session.userId) });
    }
    res.redirect('/todo');
  }
}
