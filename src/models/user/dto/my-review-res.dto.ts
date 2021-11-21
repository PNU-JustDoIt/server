export interface MyReviewRes {
  review_id: number; // 리뷰 번호

  /* 강의 정보 */
  lecture_name: string; // 강의명
  professor_name: string; // 교수명
  lecture_category: string; // 교과구분
  lecture_grade: number; // 학점
  lecture_theory: number; // 이론
  lecture_training: number; // 실습

  /* 강의평 */
  review_is_report: boolean; // 과제,레포트 여부
  review_is_team_project: boolean; // 조별과제 여부
  review_main_test_count: number; // 시험 횟수
  review_sub_test_count: number; // 퀴즈 횟수
  review_test_category: string; // 시험 유형

  /* 수업 특징 */
  review_description: string; // 수업 특징 서술
  review_difficulty: number; // 체감 난이도
  review_using_books: string; // 교재 활용도
}
