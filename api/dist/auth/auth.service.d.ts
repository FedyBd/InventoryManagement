import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from "../user/entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    findOne(condition: any): Promise<User>;
    login(createAuthDto: CreateAuthDto): Promise<any>;
    user(request: any): Promise<{
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
    }>;
}
