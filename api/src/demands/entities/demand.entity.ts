import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from '../../user/entities/user.entity';  // Adjust the import path accordingly
import { Stock } from '../../stock/entities/stock.entity';  // Adjust the import path accordingly

export enum DemandStatus {
    NOT_CHECKED = 'NOT CHECKED',
    CHECKING = 'CHECKING',
    APPROVED = 'APPROVED',
    REFUSED = 'REFUSED',
}

@Entity('demands')
export class Demand {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stock, stock => stock.demands, { eager: true })
    stock: Stock;

    @Column()
    stockId: number;

    @ManyToOne(() => User, user => user.demandsasUser, { eager: true })
    user: User;
    @Column()
    userId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => User, magazine => magazine.demandsasMag, { eager: true })
    magazine: User;
    @Column()
    magazineId: number;

    @CreateDateColumn()
    submissionDate: Date;

    @Column({
        type: 'enum',
        enum: DemandStatus,
        default: DemandStatus.NOT_CHECKED,
    })
    status: DemandStatus;
}

