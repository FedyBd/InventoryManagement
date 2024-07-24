import { Demand, DemandStatus } from "./entities/demand.entity";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { Stock } from "../stock/entities/stock.entity";
export declare class DemandsService {
    private demandRepository;
    private userRepository;
    private stockRepository;
    constructor(demandRepository: Repository<Demand>, userRepository: Repository<User>, stockRepository: Repository<Stock>);
    create(stockId: number, userId: number, quantity: number, magazineId: number): Promise<Demand>;
    findAll(id: number): Promise<Demand[]>;
    findAllMag(id: number): Promise<Demand[]>;
    update(id: number, status: DemandStatus): Promise<Demand>;
    findOne(id: number): string;
    remove(id: number): string;
}
