import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeModule } from './anime/anime.module';
import { UsersModule } from './users/users.module';
import { AnimeEntity } from './anime/entities/anime.entity';
import { UserEntity } from './users/entities/user.entity';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [ 
    CacheModule.registerAsync({
    useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }),
}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'marcello',
      password: 'marcello123',
      database: 'animes',
      entities: [AnimeEntity, UserEntity],
      extra: {
        connectionLimit: 5,
      },
      synchronize: true,
    }),
    AnimeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
