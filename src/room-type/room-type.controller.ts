import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoomType } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/adminRoles.guard';

@ApiTags('RoomTypes')
@Controller('room-types')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new room type' })
  @ApiResponse({
    status: 201,
    description: 'The room type has been successfully created.',
  })
  create(@Body() createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all room types' })
  @ApiResponse({
    status: 200,
    description: 'List of all room types.',
  })
  findAll(): Promise<RoomType[]> {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get a room type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The room type details.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room type not found.',
  })
  findOne(@Param('id') id: number): Promise<RoomType | null> {
    return this.roomTypeService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a room type' })
  @ApiResponse({
    status: 200,
    description: 'The room type has been successfully updated.',
  })
  update(
    @Param('id') id: number,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    return this.roomTypeService.update(+id, updateRoomTypeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a room type' })
  @ApiResponse({
    status: 200,
    description: 'The room type has been successfully deleted.',
  })
  remove(@Param('id') id: number): Promise<RoomType> {
    return this.roomTypeService.remove(id);
  }
}
