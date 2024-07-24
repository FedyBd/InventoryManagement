import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import  * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {
  }

  async findOne(condition:any) {
    return await this.userRepository.findOne(condition);
  }

  async login(createAuthDto: CreateAuthDto): Promise<any> {
    const { email, password } = createAuthDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt= await this.jwtService.signAsync({id: user.id});

    return { message: "logged in successfully", jwt: jwt };

  }
  async user(request){
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.findOne({where : {id: data['id']}});

      const {password, ...result} = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
