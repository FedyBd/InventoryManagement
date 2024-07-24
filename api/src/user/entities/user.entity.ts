import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Stock} from "../../stock/entities/stock.entity";
import {Request} from "../../request/entities/request.entity";
import {Demand} from "../../demands/entities/demand.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name:string;

    @Column()
    phone: string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({ type: 'enum', enum: ['Office', 'Store'] })
    type: string;

    @Column({ nullable: true })
    magasinId?: number;

    @OneToMany(()=>Stock,(stock)=>stock.user)
    stocks:Stock[]

    @OneToMany(() => Request, (request) => request.user)
    requestsAsUser: Request[];

    @OneToMany(() => Request, (request) => request.magazine)
    requestsAsMagazine: Request[];

    @OneToMany(() => Demand, demand => demand.user)
    demandsasUser: Demand[];
    @OneToMany(() => Demand, demand => demand.user)
    demandsasMag: Demand[];

}
