import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LectureReview } from './entities/lecture-review.entity';
import { LectureReviewController } from './lecture-review.controller';
import { LectureReviewService } from './lecture-review.service';

@Module({
  imports: [TypeOrmModule.forFeature([LectureReview])],
  exports: [LectureReviewService],
  providers: [LectureReviewService],
  controllers: [LectureReviewController],
})
export class LectureReviewModule {}
