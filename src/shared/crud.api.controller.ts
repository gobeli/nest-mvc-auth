import { EntityService } from './entity.service';
import { IEntityName } from './../app.constants';
import { AuthGuard } from './auth/auth.guard';
import { Controller, UseGuards, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BaseEntity } from './base.entity';

export abstract class CrudApiController<T extends BaseEntity> {
  constructor(public service: EntityService<T>) {}

  @Get()
  async getAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param() params): Promise<T> {
    return this.service.findById(params.id);
  }

  @Post()
  async create(@Body() entity) {
    return this.service.save(entity);
  }

  @Put(':id')
  async update(@Body() entity, @Param() params) {
    const e = await this.service.findById(params.id);
    return this.service.save(Object.assign(e, entity));
  }

  @Delete(':id')
  async delete(@Param() params) {
    const e = await this.service.findById(params.id);
    return this.service.remove(params.id);
  }
}