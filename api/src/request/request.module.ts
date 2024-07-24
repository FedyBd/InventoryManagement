import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Stock} from "../stock/entities/stock.entity";
import {Request} from "./entities/request.entity";
import {JwtModule} from "@nestjs/jwt";
@Module({
  imports:[TypeOrmModule.forFeature([Request, User, Stock]),
    JwtModule.register({
      secret:'osifnqjom@{#@~shejrphqzfezr',
      signOptions: {expiresIn: '10h'}
    })
  ],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
