import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { Repository } from "typeorm/repository/Repository";
import { EntityService } from "../shared/entity.service";

@Component()
export class TodoService extends EntityService<Todo> {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) { 
    super(todoRepository);
  }

  async findByOwner(userId: number) {
    return await this.todoRepository.find({ where: { owner: userId } });
  }
}