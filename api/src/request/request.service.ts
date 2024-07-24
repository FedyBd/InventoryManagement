import {Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Request} from "./entities/request.entity";
import {User} from "../user/entities/user.entity";
import {Stock} from "../stock/entities/stock.entity";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class RequestService {

  constructor(
      @InjectRepository(Request)
      private requestRepository: Repository<Request>,
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(Stock)
      private stockRepository: Repository<Stock>,
      private readonly jwtService: JwtService
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = new Request();
    request.difference = createRequestDto.difference;

    // Load related entities
    request.user = await this.userRepository.findOne({ where: { id: createRequestDto.userId } });
    request.magazine = await this.userRepository.findOne({where :{ id: createRequestDto.magazineId}});
    request.stock = await this.stockRepository.findOne({ where: {id : createRequestDto.stockId}});

    // Save the request entity
    return await this.requestRepository.save(request);
  }
  async findRequests(id:number,request,token){
    // Decode JWT token to get userId
    const decodedToken = this.jwtService.decode(token) as { id: number };
    // Check if the userId from the token matches the userId in the stock table
    console.log(id != decodedToken.id);
    if (id != decodedToken.id) {
      console.log(`id: ${id}`)
      console.log(`decodedToken.id ${decodedToken.id}`);
      throw new UnauthorizedException('You do not have permission to visualize this modifications');
    }
    let user = await this.userRepository.findOne({where: {id: id}});
    let requests = await this.requestRepository.find({
      where:{user:user},
      relations:['user','stock','magazine']
    })
    return requests;
  }

  findAll() {
    return `This action returns all request`;
  }

  findOne(id: number) {
    return this.requestRepository.findOne({where:{id}});
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
