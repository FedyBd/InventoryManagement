import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandStatusDto } from './dto/update-demand.dto';
import { Demand } from "./entities/demand.entity";
export declare class DemandsController {
    private readonly demandsService;
    constructor(demandsService: DemandsService);
    create(createDemandDto: CreateDemandDto): Promise<Demand>;
    findAll(userId: number): Promise<Demand[]>;
    findAllMag(magId: number): Promise<Demand[]>;
    updateStatus(id: number, status: UpdateDemandStatusDto): Promise<Demand>;
    findOne(id: string): string;
    remove(id: string): string;
}
