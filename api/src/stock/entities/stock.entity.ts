import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../user/entities/user.entity";
import {Request} from "../../request/entities/request.entity";
import {Demand} from "../../demands/entities/demand.entity";

@Entity('stocks')
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    quantity: string;
    @Column()
    unit:string;

    @ManyToOne(() => User, (user) => user.stocks)
    user: User;

    @Column()
    userId:number;

    @OneToMany(() => Request, (request) => request.stock)
    requests: Request[];

    @OneToMany(() => Demand, demand => demand.stock)
    demands: Demand[];

}
