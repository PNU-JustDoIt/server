import { CertifiedImageModule } from './../certified-image/certified-image.module';
import { UserModule } from './../user/user.module';
import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LectureReview } from './entities/lecture-review.entity';
import { LectureReviewController } from './lecture-review.controller';
import { LectureReviewService } from './lecture-review.service';
import { LectureModule } from '../lecture/lecture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LectureReview]),
    UserModule,
    LectureModule,
    CertifiedImageModule,
  ],
  exports: [LectureReviewService],
  providers: [LectureReviewService],
  controllers: [LectureReviewController],
})
export class LectureReviewModule {}
