import { AuthGuard } from './../shared/auth/auth.guard';
import { TodoService } from './todo.service';
import { Get, Controller, Post, Res, Req, Body, Delete, Param, ReflectMetadata, UseGuards } from '@nestjs/common';
import { CrudController } from '../shared/crud.controller';
import { ENTITIES } from '../app.constants';
import { CrudApiController } from '../shared/crud.api.controller';
import { Todo } from './todo.entity';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('api/todo')
@UseGuards(AuthGuard)
@ApiUseTags('todo')
export class TodoApiController extends CrudApiController<Todo> {
  constructor(private todoService: TodoService) {
    super(todoService);
  }
}