import { Get, Controller, Post, Res, Req, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';
import { UserService } from '../shared/auth/user.service';
import { AuthGuard } from '../shared/auth/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService, private readonly userService: UserService) {}

	@Get()
	async overview(@Req() req, @Res() res): Promise<void> {
    const todos = await this.todoService.findByOwner(req.session.userId);
    res.render('todo/index', { todos: todos || [] });
  }

  @Post()
  async add(@Body('text') text, @Req() req, @Res() res): Promise<void> {
    if (!text) {
      req.session.flash = { type: 'error', message: 'Text cannot be empty' };
    } else {
      await this.todoService.save(<Todo>{ text, owner: await this.userService.findById(req.session.userId) }); 
    }
    res.redirect('/todo');
  }

  @Delete(':id')
  async remove(@Param() params, @Req() req, @Res() res) {
    await this.todoService.remove(params.id);
    req.session.flash = { type: 'success', message: 'Todo deleted' };
    res.json('success');
  }
}
