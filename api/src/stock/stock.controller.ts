import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {User} from "../user/entities/user.entity";
import {Stock} from "./entities/stock.entity";
import {Request} from "express";

@Controller("stocks")
export class StockController {
  constructor(private readonly stockService: StockService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getAllStocks(@Param('userId') userId: number): Promise<Stock[]> {
    return this.stockService.getAllStocks(userId);
  }
  @Post()
  create(@Body(ValidationPipe) createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }
    @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateStock(
      @Param('id') id: number,
      @Body('quantity') quantity: string,
      @Req() request: Request
  ): Promise<Stock> {
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('JWT token not found');
    }

    return this.stockService.updateStock(id, quantity, token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.stockService.remove(id);
  }

}
