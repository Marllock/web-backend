import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { AnimeEntity } from './entities/anime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnimeService {
  
  constructor(
    @InjectRepository(AnimeEntity)
    private animeRepository: Repository<AnimeEntity>,
  ) {}
  async create(createAnimeDto: CreateAnimeDto) {
    const anime = new AnimeEntity();
    anime.animeName = createAnimeDto.animeName;
    anime.animeDescription = createAnimeDto.animeDescription

    return await this.animeRepository.save(anime);
  }

}
