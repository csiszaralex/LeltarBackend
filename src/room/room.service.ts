import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.prisma.room.create({ data: createRoomDto });
  }

  findAll(): Promise<Room[]> {
    return this.prisma.room.findMany();
  }

  findOne(id: number): Promise<Room | null> {
    return this.prisma.room.findUnique({ where: { id } });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room | null> {
    const room = await this.findOne(id);
    if (!room) return null;
    return this.prisma.room.update({ where: { id }, data: updateRoomDto });
  }

  async remove(id: number): Promise<boolean> {
    const room = await this.findOne(id);
    if (!room) return false;
    await this.prisma.room.delete({ where: { id } });
    return true;
  }
}
