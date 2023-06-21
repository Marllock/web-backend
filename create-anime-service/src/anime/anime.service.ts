import { Injectable } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';

@Injectable()
export class AnimeService {
  create(createAnimeDto: CreateAnimeDto) {
    return 'This action adds a new anime';
  }

  
}
