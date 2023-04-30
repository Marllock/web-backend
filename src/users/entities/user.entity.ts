import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'email_login', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password_login', nullable: false })
  password: string;
}
