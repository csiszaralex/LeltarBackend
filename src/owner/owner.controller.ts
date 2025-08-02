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
import { Owner } from '@prisma/client';
import { Response } from 'express';
import { Id } from 'src/utils/id.decorator';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }

  @Get(':id')
  async findOne(@Id() id: number): Promise<Owner> {
    const owner = await this.ownerService.findOne(id);
    if (!owner) throw new NotFoundException(`Owner with id ${id} not found`);
    return owner;
  }

  @Patch(':id')
  async update(@Id() id: number, @Body() updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.ownerService.update(id, updateOwnerDto);
    if (!owner) throw new NotFoundException(`Owner with id ${id} not found`);
    return owner;
  }

  @Delete(':id')
  async remove(@Id() id: number, @Res() res: Response): Promise<void> {
    const deleted = await this.ownerService.remove(id);
    if (!deleted) res.status(HttpStatus.NO_CONTENT);
    res.send();
  }
}
