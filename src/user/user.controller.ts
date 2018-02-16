import { AuthGuard } from './../shared/auth/auth.guard';
import { Get, Controller, Post, Res, Req, Body, Delete, Param, ReflectMetadata, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/auth/user.service';
import User from '../shared/auth/user.entity';
import { CrudController } from '../shared/crud.controller';
import { ENTITIES } from '../app.constants';

@Controller('user')
@UseGuards(AuthGuard)
@ReflectMetadata('admin', true)
export class UserController extends CrudController<User> {
  constructor(private userService: UserService) {
    super(ENTITIES.user, userService, User);
  }
}