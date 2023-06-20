import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimeModule } from './anime/anime.module';
import { UsersModule } from './users/users.module';
import { AnimeEntity } from './anime/entities/anime.entity';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
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
