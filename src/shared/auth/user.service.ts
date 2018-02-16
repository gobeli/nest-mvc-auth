import { Component } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import User from "./user.entity";
import { EntityService } from "../entity.service";

@Component()
export class UserService extends EntityService<User> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { 
    super(userRepository);
  }

  async findByUserName(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
}