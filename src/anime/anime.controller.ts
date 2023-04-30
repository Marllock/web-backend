import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/post')
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Get()
  findAll(@Query() search: string) {
    return this.animeService.findAll(search);
  }
}
