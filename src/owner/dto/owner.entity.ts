import { ApiProperty } from '@nestjs/swagger';
import { $Enums, type Prisma } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class OwnerEntity implements Prisma.OwnerCreateInput {
  @IsString()
  @ApiProperty({ description: 'The name of the owner', example: 'John Doe' })
  name: string;

  @IsEnum($Enums.OwnerType)
  @ApiProperty({
    description: 'The type of the owner',
    example: $Enums.OwnerType.PERSON,
    enum: $Enums.OwnerType,
  })
  type?: $Enums.OwnerType | undefined;
}
