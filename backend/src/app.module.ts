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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 2,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: ThrottlerGuard,}],
})
export class AppModule {}
