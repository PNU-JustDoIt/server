import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Lecture } from './entities/lecture.entity';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';


@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  exports: [LectureService],
  controllers: [LectureController],
  providers: [LectureService],
})
export class LectureModule {}
