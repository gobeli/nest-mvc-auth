import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { UserController } from "./user.controller";


@Module({
  imports: [SharedModule],
  controllers: [UserController],
})
export class UserModule {}