import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import {Stock} from "./stock/entities/stock.entity";
import { RequestModule } from './request/request.module';
import {Request} from "./request/entities/request.entity";
import { DemandsModule } from './demands/demands.module';
import {Demand} from "./demands/entities/demand.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'userauth',
      entities: [User,Stock,Request,Demand],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    StockModule,
    RequestModule,
    DemandsModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
      ],
})
export class AppModule {}
