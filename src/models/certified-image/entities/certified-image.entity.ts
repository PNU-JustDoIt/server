import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CertifiedImageBase } from '../interfaces/certified-image.interface';

@Entity({ name: 'certified-image' })
export class CertifiedImage implements CertifiedImageBase {
  @PrimaryGeneratedColumn()
  certified_image_id: number;

  @Column({ type: 'varchar', nullable: false })
  certified_image_url: string;
}
