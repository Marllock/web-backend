import { IsNotEmpty, IsString, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Escape } from 'class-sanitizer';

export class CreateAnimeDto {
  @ApiProperty({ example: 'One Piece' })
  @Escape()
  @IsNotEmpty()
  animeName: string;

  @ApiProperty({ example: 'Pirata que estica' })
  @Escape()
  @IsNotEmpty()
  animeDescription: string;
}
