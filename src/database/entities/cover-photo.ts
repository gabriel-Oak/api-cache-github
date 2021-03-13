import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class CoverPhoto {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  url: string;

  @Column('integer')
  userId: number;

  constructor(id: string, url: string, userId: number) {
    this.id = id;
    this.url = url;
    this.userId = userId;
  }

}