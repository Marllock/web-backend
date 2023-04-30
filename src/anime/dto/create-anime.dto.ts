import { IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateAnimeDto {
  @IsNotEmpty()
  animeName: string;

  @IsNotEmpty()
  animeDescription: string;
}
