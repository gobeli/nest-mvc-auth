import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as mySqlSession from 'express-mysql-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { SessionService } from './session/session.service';
import { NotFoundExceptionFilter } from './not-found-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
	const app = await NestFactory.create(ApplicationModule);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'pug');
	app.use('/assets', express.static(path.join(__dirname, 'assets')));
  app.useGlobalFilters(new NotFoundExceptionFilter());
	const service = app.select<SessionModule>(SessionModule).get<SessionService>(SessionService);


  const options = new DocumentBuilder()
    .setTitle('Todo Api')
    .setVersion('1.0')
		.addTag('todo')
		.setBasePath('/api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

	app.use(session({
		cookie: { maxAge: 86400000 },
		store: service,
		saveUninitialized: true,
		resave: 'true',
		secret: 'superssecret'
	}));

	app.use((req, res, next) => {
		res.locals.flash = req.session.flash;
		res.locals.userId = req.session.userId;
		res.locals.isAdmin = req.session.isAdmin;
		res.locals.path = req.path;
		delete req.session.flash;
		next();
	});

	app.use((err, req, res, next) => {
		res.status(err.status)
		res.render('error', { err })
	});

	await app.listen(3000);
}
bootstrap();
