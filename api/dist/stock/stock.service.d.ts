import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from "./entities/stock.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
export declare class StockService {
    private repo;
    private readonly jwtService;
    constructor(repo: Repository<Stock>, jwtService: JwtService);
    getAllStocks(userId: number): Promise<Stock[]>;
    create(createStockDto: CreateStockDto): Promise<CreateStockDto & Stock>;
    updateStock(id: number, quantity: string, token: string): Promise<Stock>;
    remove(id: number): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
}
