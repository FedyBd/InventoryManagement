import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from "./entities/stock.entity";
import { Request } from "express";
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    getAllStocks(userId: number): Promise<Stock[]>;
    create(createStockDto: CreateStockDto): Promise<CreateStockDto & Stock>;
    updateStock(id: number, quantity: string, request: Request): Promise<Stock>;
    findOne(id: string): string;
    remove(id: number): Promise<void>;
}
