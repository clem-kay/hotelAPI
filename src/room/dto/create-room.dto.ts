import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    description: 'User Id of the logged-in user',
    example: 101,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Unique number identifying the room',
    example: 101,
  })
  @IsInt()
  @IsNotEmpty()
  number: number;

  @ApiPropertyOptional({
    description: 'Availability status of the room',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiProperty({ description: 'ID of the associated room type', example: 1 })
  @IsInt()
  @IsNotEmpty()
  roomTypeId: number;

  @ApiProperty({
    description: 'Location of the room',
    example: '3rd Floor, Building A',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}
