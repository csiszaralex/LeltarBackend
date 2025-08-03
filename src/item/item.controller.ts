import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Res } from '@nestjs/common';
import { Item } from '@prisma/client';
import { Response } from 'express';
import { Id } from 'src/utils/id.decorator';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Id() id: number): Promise<Item> {
    const item = await this.itemService.findOne(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    return item;
  }

  @Patch(':id')
  async update(@Id() id: number, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemService.update(id, updateItemDto);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return item;
  }

  @Delete(':id')
  async remove(@Id() id: number, @Res() res: Response): Promise<void> {
    const deleted = await this.itemService.remove(id);
    if (!deleted) res.status(204);
    res.send();
  }
}
