import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @MessagePattern('anime')
  create(@Payload() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

}
