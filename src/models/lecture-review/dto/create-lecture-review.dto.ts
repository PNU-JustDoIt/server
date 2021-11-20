export interface CreateLectureReviewReq {
  review_id: number;

  lecture_id: number;
  user_id: number;

  certified_image_url: string;

  review_description: string;
  review_using_books: string;
  review_difficulty: number;
  review_is_report: boolean;
  review_is_team_project: boolean;
  review_main_test_count: number;
  review_sub_test_count: number;
  review_test_category: string;
}
