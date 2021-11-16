import { LectureReview } from 'src/models/lecture-review/entities/lecture-review.entity';
import { Lecture } from 'src/models/lecture/entities/lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CertifiedImageBase } from '../interfaces/certified-image.interface';

@Entity({ name: 'certifiedImage' })
export class CertifiedImage implements CertifiedImageBase {
  @PrimaryGeneratedColumn()
  certified_image_id: number;

  @OneToOne(() => LectureReview, (review) => review.certifiedImage)
  @JoinColumn()
  review_id: LectureReview;

  @Column({ type: 'varchar', nullable: false })
  certified_image_url: string;
}
