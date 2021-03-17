import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface CoverPhotoProps {
  externalId: string;
  userId: number;
  url: string;
  thumbUrl: string;
  deleteUrl: string;
}
@Entity()
export default class CoverPhoto {
  @PrimaryColumn('integer')
  userId!: number;

  @Column('text')
  externalId!: string;

  @Column('text')
  url!: string;

  @Column('text')
  thumbUrl!: string;

  @Column('text')
  deleteUrl!: string;

  constructor(params: CoverPhotoProps | undefined) {
    if (params) Object.assign(this, params);
  }

}