import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  role: string;

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
}
