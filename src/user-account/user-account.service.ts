import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from '../helpers/index';
import { ChangePasswordDTO } from 'src/auth/dto/LoginDto';

@Injectable()
export class UserAccountService {
  logout(userId: number) {
    throw new Error('Method not implemented.' + userId);
  }
  private readonly logger = new Logger(UserAccountService.name);

  constructor(private readonly prisma: PrismaService) {}

  async activate(id: number, body: { isActive: boolean; userId: number }) {
    if (body.isActive) {
      this.logger.log(`Activating user account with ID: ${id}`);
    } else {
      this.logger.log(`Deactivating user account with ID: ${id}`);
    }

    try {
      const result = await this.prisma.userAccount.update({
        where: { id },
        data: {
          isActive: body.isActive,
        },
      });
      if (body.isActive) {
        this.logger.log(`Successfully Activated user account with ID: ${id}`);
      } else {
        this.logger.log(`Successfully Deactivated user account with ID: ${id}`);
      }

      const userReturn = {
        username: result.username,
        role: result.role,
        isActive: result.isActive,
      };
      return userReturn;
    } catch (error) {
      this.logger.error(
        `Failed to activate user account with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    const userAccounts = await this.prisma.userAccount.findMany();
    return { message: 'success', userAccounts };
  }

  async create(createUserAccountDto: CreateUserAccountDto) {
    const hashedPassword = await bcrypt.hash(createUserAccountDto.password, 10);

    const user = await this.prisma.userAccount.create({
      data: {
        username: createUserAccountDto.username.toLowerCase(),
        password: hashedPassword,
        role: createUserAccountDto.role.toUpperCase(),
        isActive: createUserAccountDto.isActive,
        hashedRT: createUserAccountDto.hashedRT,
      },
    });

    const returnUser = {
      message: 'success',
      username: user.username,
      role: createUserAccountDto.role,
    };

    return returnUser;
  }

  async update(id: number, updateUserAccountDto: UpdateUserAccountDto) {
    const data: any = {};
    console.log(updateUserAccountDto);

    if (updateUserAccountDto.username) {
      data.username = updateUserAccountDto.username.toLowerCase();
    }

    if (updateUserAccountDto.password) {
      data.password = await hashPassword(updateUserAccountDto.password);
    }

    if (updateUserAccountDto.role) {
      data.role = updateUserAccountDto.role;
    }

    if (updateUserAccountDto.isActive !== undefined) {
      data.isActive = updateUserAccountDto.isActive;
    }

    if (updateUserAccountDto.hashedRT) {
      data.hashedRT = updateUserAccountDto.hashedRT;
    }

    const updatedUser = await this.prisma.userAccount.update({
      where: { id },
      data,
    });
    return {
      message: 'success',
      username: updatedUser.username,
      role: updatedUser.role,
    };
  }

  async findOneByUsername(username: string) {
    this.logger.log(`Fetching user account with username: ${username}`);
    try {
      const userAccount = await this.prisma.userAccount.findUnique({
        where: { username },
      });
      this.logger.log(
        `Successfully fetched user account with username: ${username}`,
      );
      return userAccount;
    } catch (error) {
      this.logger.error(
        `Failed to fetch user account with username: ${username}`,
        error.stack,
      );
      throw error;
    }
  }
  async findOneById(id: number) {
    this.logger.log(`Fetching user account with ID: ${id}`);
    try {
      const userAccount = await this.prisma.userAccount.findUnique({
        where: { id },
      });
      this.logger.log(`Successfully fetched user account with ID: ${id}`);
      return { message: 'success', userAccount };
    } catch (error) {
      this.logger.error(
        `Failed to fetch user account with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }
  async updateRTHash(id: number, rt: string) {
    this.logger.log(
      `Updating refresh token hash for user account with ID: ${id}`,
    );
    try {
      const hash = await hashPassword(rt);
      await this.prisma.userAccount.update({
        where: { id },
        data: {
          hashedRT: hash,
        },
      });
      this.logger.log(
        `Successfully updated refresh token hash for user account with ID: ${id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to update refresh token hash for user account with ID: ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async changePassword(changePasswordDTO: ChangePasswordDTO) {
    this.logger.log(
      `Changing password for user with username: ${changePasswordDTO.username}`,
    );
    try {
      const user = await this.findOneByUsername(changePasswordDTO.username);
      if (!user) throw new ForbiddenException('Invalid Username');

      const passwordMatches = await bcrypt.compare(
        changePasswordDTO.oldPassword,
        user.password,
      );
      if (!passwordMatches) {
        throw new UnauthorizedException('Passwords do not match');
      }

      const changedPassword = await this.prisma.userAccount.update({
        where: {
          id: user.id,
        },
        data: {
          password: await hashPassword(changePasswordDTO.newPassword),
        },
      });

      if (!changedPassword) {
        throw new UnprocessableEntityException('Unable to change password');
      } else {
        this.logger.log(
          `Successfully changed password for user with username: ${changePasswordDTO.username}`,
        );
        return { message: 'success' };
      }
    } catch (error) {
      this.logger.error(
        `Failed to change password for user with username: ${changePasswordDTO.username}`,
        error.stack,
      );
      throw error;
    }
  }
}
