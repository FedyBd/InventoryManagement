import {Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateDemandDto } from './dto/create-demand.dto';

import {InjectRepository} from "@nestjs/typeorm";
import {Demand,DemandStatus} from "./entities/demand.entity";
import {Repository} from "typeorm";
import {User} from "../user/entities/user.entity";
import {Stock} from "../stock/entities/stock.entity";

@Injectable()
export class DemandsService {
  constructor(
      @InjectRepository(Demand)
      private demandRepository: Repository<Demand>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(Stock)
      private stockRepository: Repository<Stock>,
  ) {}


  async create(stockId: number, userId: number, quantity: number, magazineId: number): Promise<Demand> {
    const stock = await this.stockRepository.findOne({where:{id:stockId}});
    const user = await this.userRepository.findOne({where:{id:userId}});
    const magazine = await this.userRepository.findOne({where:{id:magazineId}});
    const newDemand = this.demandRepository.create({
      stock,
      user,
      quantity,
      magazine,
      status: DemandStatus.NOT_CHECKED,  // Default value for status
    });

    return this.demandRepository.save(newDemand);
  }

  findAll(id:number) {
    return this.demandRepository.find({where:{userId:id}});
  }
  findAllMag(id:number) {
    return this.demandRepository.find({where:{magazineId:id}});
  }

  async update(id: number, status: DemandStatus) {
    const demand = await this.demandRepository.findOne({where:{id:id}});
    if(!demand){throw new UnauthorizedException('Demand does not exists')}
    // Update the status
    await this.demandRepository.update({id},{status:status});
    console.log('hhhh');
    // Save the updated demand
    return this.demandRepository.findOne({where: {id}});

  }

/************************************/


  findOne(id: number) {
    return `This action returns a #${id} demand`;
  }



  remove(id: number) {
    return `This action removes a #${id} demand`;
  }
}
