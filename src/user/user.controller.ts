import { Get, Controller, Post, Res, Req, Body, Delete, Param, ReflectMetadata } from '@nestjs/common';
import { UserService } from '../shared/auth/user.service';
import User from '../shared/auth/user.entity';
import { CrudController } from '../shared/crud.controller';
import { ENTITIES } from '../app.constants';

@Controller('user')
@ReflectMetadata('admin', true)
export class UserController extends CrudController<User> {
  constructor(private userService: UserService) {
    super(ENTITIES.user, userService, User);
  } 
}