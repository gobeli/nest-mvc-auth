import { Get, Controller, Post, Res, Req, Body, Delete, Param, ReflectMetadata } from '@nestjs/common';
import User from '../shared/auth/user.entity';
import { EntityService } from './entity.service';
import { BaseEntity } from './base.entity';
import { IEntityName } from '../app.constants';
import {validate} from "class-validator";
import { formatErrors } from '../helper';
import { CrudApiController } from './crud.api.controller';


export class CrudController<T extends BaseEntity> extends CrudApiController<T> {
  constructor(private entityName: IEntityName, private s: EntityService<T>, private type: {new(fields): T}) {
    super(s);
  }

  @Get('')
  async index(@Req() req, @Res() res) {
    const entities = await super.getAll();
    res.render(`${this.entityName.name}/index`, { [this.entityName.plural]: entities });
    return entities;
  }

  @Get('edit/:id')
  async edit(@Param() params, @Res() res) {
    const entity = await this.service.findById(params.id);
    res.render(`${this.entityName.name}/edit`, { [this.entityName.name]: entity });
  }

  @Post('edit/:id')
  async save(@Param() params, @Body() entity: T, @Req() req, @Res() res): Promise<void> {
    let e = new this.type(entity);
    if (params.id > 0) {
      const existing = await this.service.findById(params.id);
      Object.assign(existing, e);
      e = existing;
    }
    const errors = await validate(e);
    if (errors.length > 0) {
      req.session.flash = { type: 'error', message: formatErrors(errors) };
      res.redirect('back');
    } else {
      try {
        await this.service.save(e);
      } catch (err) {
        req.session.flash = { type: 'error', message: err.message };
        res.redirect('back');
      }
      res.redirect(`/${this.entityName.name}`);
    }
  }

  @Delete(':id')
  async delete(@Param() params, @Req() req, @Res() res) {
    await this.service.remove(params.id);
    req.session.flash = { type: 'success', message: `Deleted ${this.entityName.name}` };
    res.json('success');
  }
}