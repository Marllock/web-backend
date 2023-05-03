import { IsNotEmpty, IsString, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimeDto {
  @ApiProperty({ example: 'One Piece' })
  @IsNotEmpty()
  animeName: string;

  @ApiProperty({ example: 'Pirata que estica' })
  @IsNotEmpty()
  animeDescription: string;
}
