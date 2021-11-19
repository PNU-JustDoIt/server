import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Lecture } from './entities/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  exports: [LectureService],
  providers: [LectureService],
})
export class LectureModule {}
