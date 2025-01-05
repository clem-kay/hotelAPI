import { Injectable, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const { userId, ...roomData } = createRoomDto;
    this.logger.log(
      `Creating a new room type: ${JSON.stringify(createRoomDto)}`,
    );

    return this.prisma.room.create({
      data: roomData,
    });
  }

  async findAll() {
    this.logger.log('Fetching all room');
    return this.prisma.room.findMany({
      include: {
        roomType: true,
      },
    });
  }

  async findOne(id: number) {
    this.logger.log(`Fetching room with ID: ${id}`);

    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    this.logger.log(
      `Updating room with ID: ${id}, Data: ${JSON.stringify(updateRoomDto)}`,
    );
    const { userId, ...roomData } = updateRoomDto;
    return this.prisma.room.update({
      where: { id },
      data: roomData,
    });
  }

  async remove(id: number) {
    this.logger.log(`Deleting room  with ID: ${id}`);
    return this.prisma.room.delete({
      where: { id },
    });
  }
  async findAllAvailableRooms() {
    this.logger.log(`Fetching all available rooms`);
    return this.prisma.room.findMany({
      where: {
        isAvailable: true,
      },
    });
  }
  async findAllRoomByRoomType(roomTypeId: number) {
    return this.prisma.room.findMany({
      where: {
        roomTypeId,
      },
    });
  }

  async bookRoom(id: number) {
    // Mark room as unavailable
    return await this.prisma.room.update({
      where: { id },
      data: { isAvailable: false },
    });
  }
}
