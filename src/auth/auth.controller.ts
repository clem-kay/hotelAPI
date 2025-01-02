import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ChangePasswordDTO, LoginDto } from './dto/LoginDto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Logged in successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({ type: LoginDto, description: 'Login details' })
  async login(@Body() loginDto: LoginDto) {
    const res = await this.authService.login(loginDto);
    return res;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Logged out successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['sub']);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('changePassword')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Password changed successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({ type: ChangePasswordDTO, description: 'Change password details' })
  changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return this.authService.changePassword(changePasswordDTO);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Tokens refreshed successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['sub'], user['refreshToken']);
  }
}
