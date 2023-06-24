import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
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
  ) { }

  @Client({
    transport: Transport.RMQ,
    options: {
      queue: 'create_anime_queue',
      urls: ['amqp://marcello:123@localhost:5672'],
      queueOptions: {
        durable: false,
      },
    },
  })
  private rabitmqClient: ClientProxy;

  async create(createAnimeDto: CreateAnimeDto) {
    await this.cacheManager.del('anime')
    this.rabitmqClient.emit('anime', createAnimeDto);
  }

  async findAll(search: string) {
    try {
      const cache = await this.cacheManager.get('anime')
      if (cache) {
        return cache;
      }
      const response = await this.animeRepository.find({
        where: {
          animeName: ILike(`%${search}%`),
        },
      });
      await this.cacheManager.set('anime', response)
      return response
    } catch (e) {
      throw new HttpException(
        'No anime found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
