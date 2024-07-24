import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException} from '@nestjs/common';
import { DemandsService } from './demands.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandStatusDto } from './dto/update-demand.dto';
import {Demand, DemandStatus} from "./entities/demand.entity";
import {Request} from "express";

@Controller('demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Post()
  async create(@Body() createDemandDto: CreateDemandDto): Promise<Demand> {
    const { stockId, userId, quantity, magazineId } = createDemandDto;
    return this.demandsService.create(stockId, userId, quantity, magazineId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number): Promise<Demand[]> {
    return this.demandsService.findAll(userId);
  }

  @Get('mag/:magId')
  findAllMag(@Param('magId') magId: number): Promise<Demand[]> {
    return this.demandsService.findAllMag(magId);
  }
  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() status: UpdateDemandStatusDto) {
    return this.demandsService.update(id, status.status);
  }
/******************************************/


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandsService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandsService.remove(+id);
  }
}
