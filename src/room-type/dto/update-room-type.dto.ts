import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class UpdateRoomTypeDto {
  @ApiProperty({
    description: 'User Id of the user making the request',
    example: 'Deluxe Room',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    description: 'Name of the room type',
    example: 'Deluxe Room',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Price of the room type',
    example: 100.5,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
