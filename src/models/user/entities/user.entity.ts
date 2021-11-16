import { LectureReview } from 'src/models/lecture-review/entities/lecture-review.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBase } from '../interfaces/user-base.interface';

/**
 * @class User
 * user entity-scheme
 */
@Entity({
  name: 'user',
})
export class User implements UserBase {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'char', length: 255, nullable: false })
  user_email: string;

  @Column({ type: 'char', length: 50, nullable: false })
  user_password: string;

  @Column({ type: 'char', length: 50, nullable: false })
  user_nickname: string;

  @Column({ type: 'char', length: 13, nullable: false })
  user_phone: string;

  @OneToMany(()=> LectureReview, (lecture_review)=> lecture_review.user_id)
  @JoinColumn()
  lecture_review_id: LectureReview;
}
