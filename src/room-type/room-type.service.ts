import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as necessary
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

@Injectable()
export class RoomTypeService {
  private readonly logger = new Logger(RoomTypeService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomTypeDto: CreateRoomTypeDto) {
    this.logger.log(`Creating a new room type: ${JSON.stringify(createRoomTypeDto)}`);
    return this.prisma.roomType.create({
      data: {
        name: createRoomTypeDto.name, // Room type name
        price: createRoomTypeDto.price, // Room price
      },
    });
  }

  async findAll() {
    this.logger.log('Fetching all room types');
    return this.prisma.roomType.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`Fetching room type with ID: ${id}`);
    return this.prisma.roomType.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    this.logger.log(`Updating room type with ID: ${id}, Data: ${JSON.stringify(updateRoomTypeDto)}`);
    return this.prisma.roomType.update({
      where: { id },
      data: {
        name: updateRoomTypeDto.name, // Updated room type name
        price: updateRoomTypeDto.price, // Updated room price
      },
    });
  }


  async remove(id: number) {
    this.logger.log(`Deleting room type with ID: ${id}`);
    return this.prisma.roomType.delete({
      where: { id },
    });
  }
}
