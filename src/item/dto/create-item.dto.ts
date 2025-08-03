import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Item } from './item.entity';

export class CreateItemDto extends OmitType(Item, ['owner', 'code']) {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The unique code of the item', example: 'ITEM123', required: false })
  code?: string;
}
