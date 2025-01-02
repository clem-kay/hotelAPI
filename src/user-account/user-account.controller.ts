import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { UserAccountService } from './user-account.service';
import { DoesUserExist } from 'src/guards/doesUserExist.guard';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/adminRoles.guard';

@Controller('user-accounts')
export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {}

  @Post()
  @UseGuards(DoesUserExist)
  @UseGuards(AuthGuard('jwt'))
    @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'User created successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid data provided' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.userAccountService.create(createUserAccountDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: number,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    return this.userAccountService.update(+id, updateUserAccountDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AdminGuard)
  findAll() {
    return this.userAccountService.findAll();
  }
  @Put('/activate/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Activate or deactivate a user account' }) // Add operation summary
  @ApiOkResponse({ description: 'User activated/deactivated successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Invalid data provided' })
  @ApiForbiddenResponse({ description: 'Unauthorized request' })
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID of the user account to activate/deactivate',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isActive: {
          type: 'boolean',
          description:
            'Set to true to activate, or false to deactivate the user account',
          example: true,
        },
      },
      required: ['isActive'],
    },
  })
  async activate(@Param('id') id: string, @Body() body: { isActive: boolean }) {
    return this.userAccountService.activate(+id, body);
  }
}
