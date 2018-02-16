import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity } from "./base.entity";

export class EntityService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) { }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<T> {
    return await this.repository.findOneById(id);
  }

  async save(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    return await this.repository.deleteById(id);
  }
}