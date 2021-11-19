import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LectureController } from './models/lecture/lecture.controller';
import { LectureModule } from './models/lecture/lecture.module';
import { LectureService } from './models/lecture/lecture.service';



@Module({
  imports: [LectureModule],
  controllers: [AppController, LectureController],
  providers: [AppService, LectureService],
})
export class AppModule {}
