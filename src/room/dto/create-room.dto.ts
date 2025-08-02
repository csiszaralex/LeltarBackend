import { OmitType } from '@nestjs/swagger';
import { RoomEntity } from './room.entity';

export class CreateRoomDto extends OmitType(RoomEntity, []) {}
