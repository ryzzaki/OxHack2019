import { BaseEntity, Entity, UpdateDateColumn, Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(type => User, { eager: false })
  user: User;

  @Column()
  userId: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @UpdateDateColumn()
  lastUpdated: Date;
}
