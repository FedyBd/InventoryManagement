import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Adjust the import path as necessary
import { Stock } from '../../stock/entities/stock.entity'; // Adjust the import path as necessary

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.requestsAsUser)
    user: User;
    @Column()
    userId:number;
    @ManyToOne(() => User, magazine => magazine.requestsAsMagazine)
    magazine: User;
    @Column()
    magazineId:number;

    @ManyToOne(() => Stock, stock => stock.requests)
    stock: Stock;
    @Column()
    stockId:number;
    @Column({ type: 'decimal', precision: 10, scale: 2 }) // Specifies decimal type with precision and scale
    difference: number;

    @CreateDateColumn()
    submissionDate: Date;

}
