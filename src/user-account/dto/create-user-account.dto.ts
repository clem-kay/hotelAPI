import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enum/app.enum';

export class CreateUserAccountDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user (optional)',
    example: 'securepassword123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    description: 'The role ID of the user',
    example: 'Admin',
  })
  @IsString()
  @ApiProperty({
    description: 'Should either be ADMIN or STAFF',
    example: true,
    required: false,
  })
  role: Role;

  @ApiProperty({
    description:
      'Indicates whether the account is active (optional, default: true)',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsOptional()
  hashedRT?: string;

  @ApiProperty({
    description: 'User Id of the user making the request',
    example: 'Deluxe Room',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
