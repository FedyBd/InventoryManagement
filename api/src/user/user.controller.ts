import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UnauthorizedException, Put
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Request} from "express";
import {User} from "./entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  @Get('magazins')
  getMagazins() {
    return this.userService.getMagazins();
  }
  @Get('magname/:id')
  magname(@Param('id') id : number) {
    return this.userService.magname(id);
  }
  @Patch(':id')
  async modify(
      @Param('id') id: number,
      @Body() user:any,
      @Req() request: Request
  ){
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('JWT token not found');
    }
    return this.userService.modifyprofile(id, user,token)
  }

  @Get('formag/:id')
  getRelatedUsers(@Param('id') id: number,@Req() request: Request) {
    const token = request.cookies['jwt'];
    if (!token) {
      throw new UnauthorizedException('JWT token not found');
    }
    return this.userService.getRelatedUsers(id,token);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
