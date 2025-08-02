import { ApiProperty } from '@nestjs/swagger';
import { type Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class RoomEntity implements Prisma.RoomCreateInput {
  @IsString()
  @ApiProperty({ description: 'The name of the room', example: 'Conference Room A' })
  name: string;
}
