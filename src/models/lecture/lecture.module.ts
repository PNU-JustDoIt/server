import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  import: [TypeOrmModule.forFeature([])],
  controllers: [LectureController],
  providers: [LectureService],  
})
export class LectureModule {}
