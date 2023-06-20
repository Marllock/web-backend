import {
  Controller,
  Get,
  Post,
  Logger,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { ApiBody, ApiTags, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { AnimeEntity } from './entities/anime.entity';
import { sanitize } from 'class-sanitizer';


@ApiTags('Animes Controller')
@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAnimeDto })
  @Post()
  async create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @ApiOkResponse({ type: [AnimeEntity] })
  @Get()
  async findAll(@Query('search') search = '') {
    try {
      sanitize(search);
      return await this.animeService.findAll(search);
    } catch (e) {
      Logger.error('failed to find animes');
    }
  }
}
