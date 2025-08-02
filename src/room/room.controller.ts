import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Room } from '@prisma/client';
import { Response } from 'express';
import { Id } from 'src/utils/id.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Id() id: number): Promise<Room> {
    const room = await this.roomService.findOne(id);
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);
    return room;
  }

  @Patch(':id')
  async update(@Id() id: number, @Body() updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomService.update(id, updateRoomDto);
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);
    return room;
  }

  @Delete(':id')
  async remove(@Id() id: number, @Res() res: Response): Promise<void> {
    const deleted = await this.roomService.remove(id);
    if (!deleted) res.status(HttpStatus.NO_CONTENT);
    res.send();
  }
}
