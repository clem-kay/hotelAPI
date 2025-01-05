import { Injectable, Logger } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomService } from 'src/room/room.service';
import { GuestService } from 'src/guest/guest.service';
import { differenceInDays } from 'date-fns';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
    private readonly guestService: GuestService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    // Step 2: Calculate the total amount
    let totalAmount = 0;
    for (const room of createBookingDto.rooms) {
      // Fetch the room details along with its RoomType price
      const roomDetails = await this.prisma.room.findUnique({
        where: { id: room.roomId },
        include: { roomType: true },
      });

      if (!roomDetails || !roomDetails.isAvailable) {
        throw new Error(`Room with ID ${room.roomId} is not available`);
      }

      // Calculate the cost for this room
      const days =
        differenceInDays(new Date(room.endDate), new Date(room.startDate)) || 1; // At least 1 day
      totalAmount += days * roomDetails.roomType.price;
    }

    //save the guest and create the booking
    const guest = await this.guestService.create(createBookingDto.guestInfo);

    const booking = await this.prisma.booking.create({
      data: {
        guestId: guest.id,
        paid: false, // Default value
        totalAmount, // Store the calculated total amount
      },
    });

    // Step 4: Create RoomBooked entries for each room and mark rooms as unavailable
    const roomBookedEntries = [];
    for (const room of createBookingDto.rooms) {
      const roomEntry = await this.prisma.roomBooked.create({
        data: {
          bookingId: booking.id,
          roomId: room.roomId,
          startDate: new Date(room.startDate),
          endDate: new Date(room.endDate),
          checkedIn: false, // Default value
        },
      });

      // Mark the room as unavailable
      await this.prisma.room.update({
        where: { id: room.roomId },
        data: { isAvailable: false },
      });

      roomBookedEntries.push(roomEntry);
    }

    // Return the booking details along with the booked rooms
    return {
      booking,
      roomBookedEntries,
    };
  }
  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  async remove(id: number) {
    await this.prisma.booking.delete({
      where: { id },
    });
  }

  async cancelBooking(bookingId: number): Promise<any> {
    // Step 1: Fetch the booking and related rooms
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { roomsBooked: true }, // Include related RoomBooked entries
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    // Step 2: Mark associated rooms as available
    for (const roomBooked of booking.roomsBooked) {
      await this.prisma.room.update({
        where: { id: roomBooked.roomId },
        data: { isAvailable: true },
      });
    }

    // Step 3: Delete RoomBooked entries
    await this.prisma.roomBooked.deleteMany({
      where: { bookingId },
    });

    // Step 4: Delete the booking
    await this.prisma.booking.delete({
      where: { id: bookingId },
    });

    return { message: 'Booking canceled successfully' };
  }

  async checkIn(roomBookedId: number): Promise<any> {
    // Step 1: Fetch the specific RoomBooked entry
    const roomBooked = await this.prisma.roomBooked.findUnique({
      where: { id: roomBookedId },
      include: { booking: true }, // Include the associated booking for context
    });

    if (!roomBooked) {
      throw new Error('Room booking not found');
    }

    if (roomBooked.checkedIn) {
      throw new Error('Guest has already checked into this room');
    }

    // Step 2: Mark the room as checked in
    const updatedRoomBooked = await this.prisma.roomBooked.update({
      where: { id: roomBookedId },
      data: { checkedIn: true },
    });

    // Step 3: Return the updated room booking details
    return {
      message: 'Checked in successfully',
      roomCheckedIn: updatedRoomBooked,
    };
  }

  async markAsPaid(bookingId: number): Promise<any> {
    const booking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { paid: true },
    });

    return booking;
  }
}
