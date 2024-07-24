import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'osifnqjom@{#@~shejrphqzfezr',
      signOptions: {expiresIn: '10h'}
    })], // Include the User entity
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
