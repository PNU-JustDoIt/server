import { LectureReview } from 'src/models/lecture-review/entities/lecture-review.entity';

export interface CertifiedImageBase {
  certified_image_id: number;
  // review_id: LectureReview;
  certified_image_url: string;
}
