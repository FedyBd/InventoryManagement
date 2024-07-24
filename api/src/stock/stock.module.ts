import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Stock} from "./entities/stock.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Stock]),
    JwtModule.register({
      secret:'osifnqjom@{#@~shejrphqzfezr',
      signOptions: {expiresIn: '10h'}
    })
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
