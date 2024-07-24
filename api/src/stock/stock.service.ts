import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Stock} from "./entities/stock.entity";
import {Repository} from "typeorm";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class StockService {

  constructor(@InjectRepository(Stock) private repo : Repository<Stock>,private readonly jwtService: JwtService) {
  }

  async getAllStocks(userId: number): Promise<Stock[]> {
    return await this.repo.find({ where: { userId } });
  }

  create(createStockDto: CreateStockDto) {
    return this.repo.save(createStockDto);
  }

  async updateStock(id: number, quantity: string, token: string): Promise<Stock> {
    // Decode JWT token to get userId
    const decodedToken = this.jwtService.decode(token) as { id: number };

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const stock = await this.repo.findOne({ where: { id } });
    if (!stock) {
      throw new UnauthorizedException('Stock not found');
    }

    // Check if the userId from the token matches the userId in the stock table
    if (stock.userId !== decodedToken.id) {
      console.log(decodedToken.id);
      throw new UnauthorizedException('You do not have permission to update this stock');
    }

    // Update the stock quantity
    await this.repo.update({ id }, { quantity });
    return this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
      try{
        await this.repo.delete({id});
      }catch(err){
        throw new InternalServerErrorException('something went wrong!');
      }
  }


  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }



}
