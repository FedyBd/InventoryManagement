import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Repository } from "typeorm";
import { Request } from "./entities/request.entity";
import { User } from "../user/entities/user.entity";
import { Stock } from "../stock/entities/stock.entity";
import { JwtService } from "@nestjs/jwt";
export declare class RequestService {
    private requestRepository;
    private userRepository;
    private stockRepository;
    private readonly jwtService;
    constructor(requestRepository: Repository<Request>, userRepository: Repository<User>, stockRepository: Repository<Stock>, jwtService: JwtService);
    create(createRequestDto: CreateRequestDto): Promise<Request>;
    findRequests(id: number, request: any, token: any): Promise<Request[]>;
    findAll(): string;
    findOne(id: number): Promise<Request>;
    update(id: number, updateRequestDto: UpdateRequestDto): string;
    remove(id: number): string;
}
