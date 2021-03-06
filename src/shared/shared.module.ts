import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./auth/user.entity";
import { UserService } from "./auth/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [UserService],
  exports: [UserService]
})
export class SharedModule {
}