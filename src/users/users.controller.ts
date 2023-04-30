import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Body() login: CreateUserDto) {
    return this.usersService.login(login);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(@Body() register: CreateUserDto) {
    return this.usersService.register(register);
  }
}
