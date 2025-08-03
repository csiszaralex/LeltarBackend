import { BadRequestException, Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    await this.validateConnections(createItemDto);
    const lastItem = await this.prisma.item.findFirst({
      orderBy: { id: 'desc' },
    });
    const nextId = (lastItem?.id || 0) + 1;
    const code = `AX${nextId.toString().padStart(6, '0')}`;
    return this.prisma.item.create({
      data: {
        code,
        name: createItemDto.name,
        description: createItemDto.description,
        value: createItemDto.value,
        purchaseDate: createItemDto.purchaseDate,
        state: createItemDto.state,
        owner: { connect: { id: createItemDto.ownerId } },
        room: createItemDto.roomId ? { connect: { id: createItemDto.roomId } } : undefined,
      },
    });
  }

  findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  findOne(id: number): Promise<Item | null> {
    return this.prisma.item.findUnique({ where: { id } });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item | null> {
    await this.validateConnections(updateItemDto);
    const item = await this.findOne(id);
    if (!item) return null;
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: number): Promise<boolean> {
    const item = await this.findOne(id);
    if (!item) return false;
    return this.prisma.item
      .delete({ where: { id } })
      .then(() => true)
      .catch(() => false);
  }

  private async validateConnections(createItemDto: UpdateItemDto): Promise<void> {
    const owner = createItemDto.ownerId
      ? await this.prisma.owner.findUnique({ where: { id: createItemDto.ownerId } })
      : undefined;
    const room = createItemDto.roomId
      ? await this.prisma.room.findUnique({ where: { id: createItemDto.roomId } })
      : undefined;
    if ((!owner && createItemDto.ownerId) || (!room && createItemDto.roomId))
      throw new BadRequestException('Owner or Room not found');
  }
}
