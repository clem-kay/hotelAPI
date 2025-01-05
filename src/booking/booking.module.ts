import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { RoomService } from 'src/room/room.service';
import { GuestService } from 'src/guest/guest.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, RoomService, GuestService],
})
export class BookingModule {}
