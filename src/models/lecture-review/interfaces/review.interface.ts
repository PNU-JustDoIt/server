/* 
name : ReviewBase interface 
description : review entity와 관련된 interface
summary : attribute number: 14,
*/
import { CertifiedImage } from './../../certified-image/entities/certified-image.entity';
import { Lecture } from 'src/models/lecture/entities/lecture.entity';
import { User } from 'src/models/user/entities/user.entity';

export interface LectureReviewBase {
  review_id: number;
  lecture_id: Lecture;
  user_id: User;
  certifiedImage: CertifiedImage;
  review_description: string;
  review_using_books: string;
  review_difficulty: number;
  review_is_report: boolean;
  review_is_team_project: boolean;
  review_main_test_count: number;
  review_sub_test_count: number;
  review_test_category: string;
}
