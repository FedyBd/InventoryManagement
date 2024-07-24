import { Stock } from "../../stock/entities/stock.entity";
import { Request } from "../../request/entities/request.entity";
import { Demand } from "../../demands/entities/demand.entity";
export declare class User {
    id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    type: string;
    magasinId?: number;
    stocks: Stock[];
    requestsAsUser: Request[];
    requestsAsMagazine: Request[];
    demandsasUser: Demand[];
    demandsasMag: Demand[];
}
