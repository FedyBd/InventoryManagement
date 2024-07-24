import { User } from '../../user/entities/user.entity';
import { Stock } from '../../stock/entities/stock.entity';
export declare class Request {
    id: number;
    user: User;
    userId: number;
    magazine: User;
    magazineId: number;
    stock: Stock;
    stockId: number;
    difference: number;
    submissionDate: Date;
}
