import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    loginn(createAuthDto: CreateAuthDto, response: Response): Promise<void>;
    user(request: Request): Promise<{
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
    logout(response: Response): Promise<{
        message: string;
    }>;
}
