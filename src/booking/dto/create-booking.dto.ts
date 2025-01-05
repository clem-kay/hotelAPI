import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGuestDto } from 'src/guest/dto/create-guest.dto';

class RoomBookingDto {
  @ApiProperty({
    description: 'ID of the room to be booked',
    example: 101,
  })
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({
    description: 'Start date of the booking in ISO 8601 format',
    example: '2025-01-10T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'End date of the booking in ISO 8601 format',
    example: '2025-01-15T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}

export class CreateBookingDto {
  @ValidateNested()
  @Type(() => CreateGuestDto)
  @ApiProperty({ type: CreateGuestDto })
  guestInfo: CreateGuestDto;
  @ApiProperty({
    description:
      'Array of rooms to be booked along with their respective dates',
    type: [RoomBookingDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomBookingDto)
  rooms: RoomBookingDto[];
}
