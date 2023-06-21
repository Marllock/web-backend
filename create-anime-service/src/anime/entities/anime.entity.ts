import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('anime_entity')
export class AnimeEntity {
  @PrimaryGeneratedColumn(`increment`)
  id: number;

  @Column({ name: 'anime_name' })
  animeName: string;

  @Column({ name: 'anime_description' })
  animeDescription: string;
}
