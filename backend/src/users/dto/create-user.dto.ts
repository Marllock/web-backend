import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Escape } from 'class-sanitizer';

export class CreateUserDto {
  @ApiProperty({ example: 'marcellovbenites@gmail.com' })
  @Escape()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @Escape()
  @IsString()
  @MinLength(8)
  password: string;
}
