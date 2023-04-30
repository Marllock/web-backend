import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(AnimeEntity)
    private animeRepository: Repository<AnimeEntity>,
  ) {}
  create(createAnimeDto: CreateAnimeDto) {
    return 'This action adds a new anime';
  }

  async findAll(search: string) {
    return await this.animeRepository.findBy({
      animeName: Like(`%${search}%`),
    });
  }
}
