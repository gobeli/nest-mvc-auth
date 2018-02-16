import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'myDb',
      type: 'mysql',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoModule,
    AuthModule,
    UserModule,
    SessionModule
  ]
})
export class ApplicationModule {
  constructor() {}
}
