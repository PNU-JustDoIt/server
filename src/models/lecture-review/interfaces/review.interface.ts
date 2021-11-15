/* 
name : ReviewBase interface 
description : review entity와 관련된 interface
summary : attribute number: 14,
*/

import { Lecture } from "src/models/lecture/entities/lecture.entity";

export interface LectureReviewBase {
  review_id: number;
  lecture_id: Lecture;
  user_id: number;
  review_description: string;
  review_using_books: string;
  review_difficulty: number;
  review_is_report: boolean;
  review_is_team_project: boolean;
  review_main_test_count: number;
  review_sub_test_count: number;
  review_test_category: string;
}
