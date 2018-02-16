import * as path from 'path';
import { ExceptionFilter, Catch, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, res) {
    console.log(exception);
		res.render('error', { err: { status: exception.getStatus(), message: exception.getResponse()['error'] } });
  }
}