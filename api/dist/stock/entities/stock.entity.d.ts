import { User } from "../../user/entities/user.entity";
import { Request } from "../../request/entities/request.entity";
import { Demand } from "../../demands/entities/demand.entity";
export declare class Stock {
    id: number;
    name: string;
    quantity: string;
    unit: string;
    user: User;
    userId: number;
    requests: Request[];
    demands: Demand[];
}
