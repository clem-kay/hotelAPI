import { Injectable, Logger } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuestService {
  private readonly logger = new Logger(GuestService.name);

  constructor(private readonly prisma: PrismaService) {}
  async create(createGuestDto: CreateGuestDto) {
    this.logger.log('Saving guest with name' + createGuestDto.firstName);
    const guest = await this.prisma.guest.create({
      data: createGuestDto,
    });

    return guest;
  }

  async findAll() {
    this.logger.log('Getting all the guest in the database');
    return this.prisma.guest.findMany();
  }

  async findManyById(ids: number[]) {
    this.logger.log(`Getting all the guests with these IDs: ${ids}`);
    return this.prisma.guest.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async findOne(id: number) {
    this.logger.log(`Getting all the guests with these IDs: ${id}`);
    return this.prisma.guest.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
