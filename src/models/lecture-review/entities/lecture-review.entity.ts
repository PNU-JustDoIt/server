import { userInfo } from 'os';
import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';
import { Lecture } from 'src/models/lecture/entities/lecture.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectureReviewBase } from '../interfaces/review.interface';

export class LectureReview implements LectureReviewBase {
  @PrimaryGeneratedColumn()
  review_id: number;

  @OneToOne(() => Lecture, (lecture) => lecture.review)
  @JoinColumn()
  lecture_id: Lecture;

  user_id: number;

  // @ManyToOne(()=> )
  // @JoinColumn()
  // user_id: number;

  @Column({ type: 'varchar', nullable: false })
  review_description: string;

  @Column({ type: 'varchar', nullable: false })
  review_using_books: string;

  @Column({ type: 'int', nullable: false })
  review_difficulty: number;

  @Column({ default: false })
  review_is_report: boolean;

  @Column({ default: false })
  review_is_team_project: boolean;

  @Column({ type: 'int' })
  review_main_test_count: number;

  @Column({ type: 'int' })
  review_sub_test_count: number;

  @Column({ type: 'varchar' })
  review_test_category: string;

  @JoinColumn()
  @OneToOne(() => CertifiedImage, (certifiedImage) => certifiedImage.review_id)
  certifiedImage: CertifiedImage;
}
