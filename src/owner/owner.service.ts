import { Injectable } from '@nestjs/common';
import { Owner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.prisma.owner.create({ data: createOwnerDto });
  }

  findAll(): Promise<Owner[]> {
    return this.prisma.owner.findMany();
  }

  findOne(id: number): Promise<Owner | null> {
    return this.prisma.owner.findUnique({ where: { id } });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner | null> {
    const owner = await this.findOne(id);
    if (!owner) return null;
    return this.prisma.owner.update({ where: { id }, data: updateOwnerDto });
  }

  async remove(id: number): Promise<boolean> {
    const owner = await this.findOne(id);
    if (!owner) return false;
    await this.prisma.owner.delete({ where: { id } });
    return true;
  }
}
