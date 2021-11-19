import { LectureReview } from 'src/models/lecture-review/entities/lecture-review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectureBase } from '../interfaces/lectureBase.interface';

@Entity({ name: 'lecture' })
export class Lecture implements LectureBase {
  @PrimaryGeneratedColumn()
  lecture_id: number;

  @Column({ type: 'varchar', nullable: false })
  lecture_name: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_code: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_semester: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_college_name: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_department_name: string;

  @Column({ type: 'varchar', nullable: false })
  lecature_category: string;

  @Column({ type: 'int', nullable: false })
  lecture_year: number;

  @Column({ type: 'varchar', nullable: false })
  lecture_professor_name: string;

  @Column({ type: 'int', nullable: false })
  lecture_grade: number;

  @Column({ type: 'int', nullable: false })
  lecture_theory: number;

  @Column({ type: 'int', nullable: false })
  lecture_training: number;

  @Column({ type: 'int', nullable: false })
  lecture_limit: number;

  @Column({ type: 'varchar', nullable: false })
  lecture_language: string;

  @Column({ type: 'boolean', nullable: false })
  lecture_is_team: boolean;

  @Column({ type: 'boolean', nullable: false })
  lecture_is_remote: boolean;

  @Column({ type: 'varchar', nullable: false })
  lecture_liberal_category: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_group: string;

  @Column({ type: 'varchar', nullable: false })
  lecture_time_table: string;

  @OneToOne(() => LectureReview, (review) => review.lecture_id)
  @JoinColumn()
  review: LectureReview;
}
