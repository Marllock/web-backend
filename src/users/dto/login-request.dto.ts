import {
    IsEmail,
    IsString,
    IsStrongPassword,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class LoginRequestDto {
    @ApiProperty({ example: 'marcellovbenites@gmail.com' })
    email: string;
  
    @ApiProperty({ example: '12345678' })
    password: string;
  }
  