import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeEntity } from './entities/anime.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([AnimeEntity]),CacheModule.register()],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
