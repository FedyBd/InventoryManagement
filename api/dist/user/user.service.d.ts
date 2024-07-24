import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private repo;
    private readonly jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<User>;
    getMagazins(): Promise<User[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    magname(id: number): Promise<{
        id: number;
        name: string;
    }>;
    modifyprofile(id: any, user: any, token: any): Promise<User>;
    getRelatedUsers(id: number, token: any): Promise<{
        id: number;
        name: string;
        phone: string;
        email: string;
        type: string;
        magasinId?: number;
        stocks: import("../stock/entities/stock.entity").Stock[];
        requestsAsUser: import("../request/entities/request.entity").Request[];
        requestsAsMagazine: import("../request/entities/request.entity").Request[];
        demandsasUser: import("../demands/entities/demand.entity").Demand[];
        demandsasMag: import("../demands/entities/demand.entity").Demand[];
    }[]>;
}
