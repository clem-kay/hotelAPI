import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateRoomTypeDto {
  @ApiProperty({ description: 'User Id of the user making the request', example: 'Deluxe Room' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Name of the room type', example: 'Deluxe Room' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Price of the room type', example: 100.5 })
  @IsNumber()
  price: number;
}
