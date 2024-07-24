import { Module } from '@nestjs/common';
import { DemandsService } from './demands.service';
import { DemandsController } from './demands.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Demand} from "./entities/demand.entity";
import {Stock} from "../stock/entities/stock.entity";
import {User} from "../user/entities/user.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Demand,User,Stock]),
    JwtModule.register({
      secret:'osifnqjom@{#@~shejrphqzfezr',
      signOptions: {expiresIn: '10h'}
    })],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}
