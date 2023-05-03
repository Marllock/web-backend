import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('anime_entity')
export class AnimeEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn(`increment`)
  id: number;

  @ApiProperty({ example: 'One Piece' })
  @Column({ name: 'anime_name' })
  animeName: string;

  @ApiProperty({ example: 'Pirata que estica' })
  @Column({ name: 'anime_description' })
  animeDescription: string;
}
