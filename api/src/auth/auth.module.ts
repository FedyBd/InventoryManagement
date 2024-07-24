import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
@Module({
  imports: [
      UserModule,
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        secret:'osifnqjom@{#@~shejrphqzfezr',
        signOptions: {expiresIn: '10h'}
      })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
