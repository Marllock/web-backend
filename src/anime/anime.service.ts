import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Repository, Like, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';

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

  async findAll(search: string) {
    try {
      return await this.animeRepository.find({
        where: {
          animeName: ILike(`%${search}%`),
        },
      });
    } catch (e) {
      throw new HttpException(
        'No vehicle found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
