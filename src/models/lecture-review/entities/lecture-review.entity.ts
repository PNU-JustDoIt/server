import { userInfo } from 'os';
import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';
import { Lecture } from 'src/models/lecture/entities/lecture.entity';
import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectureReviewBase } from '../interfaces/review.interface';

@Entity({ name: 'lecture-review' })
export class LectureReview implements LectureReviewBase {
  @PrimaryGeneratedColumn()
  review_id: number;

  @OneToOne(() => Lecture, (lecture) => lecture.review)
  @JoinColumn()
  lecture_id: Lecture;

  @ManyToOne(() => User, (user) => user.lecture_review_id)
  user_id: User;

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
