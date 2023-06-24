import { Injectable, Logger } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { AnimeEntity } from './entities/anime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimeGateway } from './anime-notification-gateway';

@Injectable()
export class AnimeService {

  constructor(
    @InjectRepository(AnimeEntity)
    private animeRepository: Repository<AnimeEntity>,
    private readonly notificationService: AnimeGateway,

  ) { }
  async create(createAnimeDto: CreateAnimeDto) {
    
    try {
      const anime = new AnimeEntity();
    anime.animeName = createAnimeDto.animeName;
    anime.animeDescription = createAnimeDto.animeDescription

    await this.animeRepository.save(anime);
    this.notificationService.sendNotification();
    } catch (error) {
      Logger.error('error save anime bd')
    }
  }

}
