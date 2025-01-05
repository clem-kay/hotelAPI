import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateGuestDto {
  @ApiProperty({
    description: 'First name of the guest',
    example: 'Clement',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the guest',
    example: 'Clement',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    description: 'Email of the guest',
    example: 'someone@someone.com',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Telephone number of the guest',
    example: '0541186989',
  })
  @IsString()
  phone: string;
}
