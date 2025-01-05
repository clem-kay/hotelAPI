import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/adminRoles.guard';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({
    status: 201,
    description: 'The room has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or validation error.',
  })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of all rooms.',
  })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve details of a specific room' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the room',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the room.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found.',
  })
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update room details' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the room to update',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The room has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found.',
  })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a room' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the room to delete',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The room has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found.',
  })
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }

  @Get('/available')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all available rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of all rooms.',
  })
  findAllAvailableRooms() {
    return this.roomService.findAllAvailableRooms();
  }
  @Get('/roomtype/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve details of a specific room' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the room type',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the room.',
  })
  @ApiResponse({
    status: 404,
    description: 'Room not found.',
  })
  findAllRoomByRoomType(@Param('id') id: string) {
    return this.roomService.findAllRoomByRoomType(+id);
  }
}
