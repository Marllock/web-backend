import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { AnimeEntity } from './anime/entities/anime.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AnimeModule, 
     TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'marcello',
    password: 'marcello123',
    database: 'animes',
    entities: [AnimeEntity,],
    extra: {
      connectionLimit: 5,
    },
    synchronize: false,
  }),
  AnimeModule,],
})
export class AppModule {}
