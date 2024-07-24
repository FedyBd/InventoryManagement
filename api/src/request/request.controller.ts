import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import {Request} from "./entities/request.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Request as ExpressRequest} from "express";
import {Stock} from "../stock/entities/stock.entity";
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestService.create(createRequestDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findforoffice(@Param('id') id: number,
                @Req() request: ExpressRequest): Promise<Request[]> {
    const token = request.cookies['jwt'];
    return this.requestService.findRequests(id,request,token);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.requestService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
