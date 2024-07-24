import { User } from '../../user/entities/user.entity';
import { Stock } from '../../stock/entities/stock.entity';
export declare enum DemandStatus {
    NOT_CHECKED = "NOT CHECKED",
    CHECKING = "CHECKING",
    APPROVED = "APPROVED",
    REFUSED = "REFUSED"
}
export declare class Demand {
    id: number;
    stock: Stock;
    stockId: number;
    user: User;
    userId: number;
    quantity: number;
    magazine: User;
    magazineId: number;
    submissionDate: Date;
    status: DemandStatus;
}
