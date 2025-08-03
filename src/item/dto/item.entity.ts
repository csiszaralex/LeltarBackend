import { ApiProperty } from '@nestjs/swagger';
import { $Enums, type Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class Item implements Prisma.ItemCreateInput {
  @IsString()
  @ApiProperty({ description: 'The unique code of the item', example: 'ITEM123' })
  code: string;

  @IsString()
  @ApiProperty({ description: 'The name of the item', example: 'Item Name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'A brief description of the item',
    example: 'This is a sample item.',
    required: false,
  })
  description?: string | null | undefined;

  @IsEnum($Enums.ItemState)
  @ApiProperty({
    description: 'The state of the item',
    example: $Enums.ItemState.AVAILABLE,
    enum: $Enums.ItemState,
  })
  state?: $Enums.ItemState | undefined;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'The date when the item was purchased',
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  purchaseDate?: Date;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    description: 'The value of the item',
    example: 1500,
    required: false,
  })
  value?: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'The ID of the user who owns the item',
    example: 1,
  })
  ownerId: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    description: 'The ID of the room where the item is located',
    example: 2,
  })
  roomId: number | null;

  owner: Prisma.OwnerCreateNestedOneWithoutItemsInput;
}
