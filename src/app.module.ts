import { LectureReviewModule } from './models/lecture-review/lecture-review.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './models/auth/auth.module';
import { LectureModule } from './models/lecture/lecture.module';
import { NaverSensModule } from './models/naver-sens/naver-sens.module';
import { UserModule } from './models/user/user.module';
import { CertifiedImageModule } from './models/certified-image/certified-image.module';
import { MysqlDatabaseProviderModule } from './providers/mysql/provider.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MysqlDatabaseProviderModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    NaverSensModule,
    LectureReviewModule,
    CertifiedImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
