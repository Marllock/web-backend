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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Controller')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBody({ type: CreateUserDto })
  @Post('/login')
  login(@Body() login: CreateUserDto) {
    return this.usersService.login(login);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @Post('/register')
 async register(@Body() register: CreateUserDto) {
    return await this.usersService.register(register);
  }
}
