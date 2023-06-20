import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { Repository, Like, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AnimeService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(AnimeEntity)
    private animeRepository: Repository<AnimeEntity>,
  ) {}
  async create(createAnimeDto: CreateAnimeDto) {
    await this.cacheManager.del('anime')
    const anime = new AnimeEntity();
    anime.animeName = createAnimeDto.animeName;
    anime.animeDescription = createAnimeDto.animeDescription

    return await this.animeRepository.save(anime);
  }

  async findAll(search: string) {
    try {
      const cache = await this.cacheManager.get('anime')
      if (cache){
        return cache;
      }
       const response = await this.animeRepository.find({
        where: {
          animeName: ILike(`%${search}%`),
        },
      });
      await this.cacheManager.set('anime',response)
    } catch (e) {
      throw new HttpException(
        'No vehicle found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
