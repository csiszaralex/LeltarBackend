import { OmitType } from '@nestjs/swagger';
import { OwnerEntity } from './owner.entity';

export class CreateOwnerDto extends OmitType(OwnerEntity, []) {}
