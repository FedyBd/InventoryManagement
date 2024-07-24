import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from "express";
import { User } from "./entities/user.entity";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<User>;
    getMagazins(): Promise<User[]>;
    magname(id: number): Promise<{
        id: number;
        name: string;
    }>;
    modify(id: number, user: any, request: Request): Promise<User>;
    getRelatedUsers(id: number, request: Request): Promise<{
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
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
