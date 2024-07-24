import {ConflictException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor (@InjectRepository (User) private repo : Repository<User>,private readonly jwtService: JwtService){}

  async register(createUserDto: CreateUserDto) {
    const {email, password, phone, name,magasinId,type} = createUserDto;
    const userExists= await this.repo.findOne({where : {email}});
    if(userExists){
      throw new ConflictException('user already exists');
    }
    const user = new User();
    user.email = email;
    user.phone = phone;
    user.name = name;
    user.password = await bcrypt.hash(password,12);
    user.magasinId=magasinId;
    user.type=type;
    this.repo.create(user);
    try{
      const saved = await this.repo.save(user);
      delete user.password;
      return saved;
    }catch{
      throw new InternalServerErrorException('something went wrong, User was not created. ')
    }
  }
  async getMagazins() {
    return this.repo.find({where: {type:'Store'}});
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


    async magname(id: number) {
      const mag = await this.repo.findOne({where: {id: id}});
      const {name, ...result} = mag;
      return {
        "id":id,
        "name": name
      };
    }

  async modifyprofile(id, user, token) {
    const decodedToken = this.jwtService.decode(token) as { id: number };

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const User = await this.repo.findOne({where: {id}});
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if the userId from the token matches the userId in the stock table
    if (User.id !== decodedToken.id) {
      throw new UnauthorizedException('You do not have permission to update this user profile');
    }

    // Update the profile
    await this.repo.update({id}, {name:user.name,email:user.email,phone:user.phone});
    return this.repo.findOne({where: {id}});
  }

  async getRelatedUsers(id: number, token: any) {
    const decodedToken = this.jwtService.decode(token) as { id: number };

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const magazine = await this.repo.findOne({where: {id}});
    if (!magazine) {
      throw new UnauthorizedException('User not found');
    }

    // Check if the userId from the token matches the userId in the stock table
    if (magazine.id !== decodedToken.id) {
      throw new UnauthorizedException('You do not have permission to get this magazine\'s users');
    }
    const relatedUsers= await this.repo.find({where: {magasinId: decodedToken.id}});
    const sanitizedUsers = relatedUsers.map(user => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser
    });

    return sanitizedUsers;
  }
}
