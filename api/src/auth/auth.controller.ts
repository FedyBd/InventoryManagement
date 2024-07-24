import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  UnauthorizedException, Req, ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Response} from "express";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('login')
  async loginn(@Body(ValidationPipe) createAuthDto: CreateAuthDto, @Res({passthrough: true}) response: Response) {
    const result = await this.authService.login(createAuthDto);
    response.cookie('jwt', result.jwt,{httpOnly:true});
  }


  @Get('user')
  async user(@Req() request: Request) {
    return this.authService.user(request);
  }


  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Logged out successfully'
    }
  }

}
