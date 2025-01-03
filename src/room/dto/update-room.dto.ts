import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty({
    description: 'User Id of the logged-in user',
    example: 101,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiPropertyOptional({
    description: 'Unique number identifying the room',
    example: 101,
  })
  @IsInt()
  @IsOptional()
  number?: number;

  @ApiPropertyOptional({
    description: 'Availability status of the room',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'ID of the associated room type',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  roomTypeId?: number;

  @ApiPropertyOptional({
    description: 'Location of the room',
    example: '3rd Floor, Building A',
  })
  @IsString()
  @IsOptional()
  location?: string;
}
