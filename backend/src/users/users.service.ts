import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(register: CreateUserDto) {
    await this.validateUniqueEmail(register);

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(register.password, saltOrRounds);

    const user: UserEntity = new UserEntity();

    user.email = register.email;
    user.password = hash;

    await this.userRepository.save(user);
    const userLogged = { sub: user.id, email: user.email };
    return { accessToken: await this.jwtService.signAsync(userLogged) };
  }

  
  private async validateUniqueEmail(login: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      email: login.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
  }

  async login(login: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      email: login.email,
    });

    if (!user || !(await bcrypt.compare(login.password, user.password))) {
      throw new UnauthorizedException('Email ou senha errados');
    }

    const userLogged = { sub: user.id, email: user.email };
    return { accessToken: await this.jwtService.signAsync(userLogged) };
  }
}
