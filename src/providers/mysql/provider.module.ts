import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { MysqlConfigModule } from 'src/config/database/configuration.module';
import { MysqlConfigService } from 'src/config/database/configuration.service';
import { User } from 'src/models/user/entities/user.entity';
import { LectureReview } from 'src/models/lecture-review/entities/lecture-review.entity';
import { Lecture } from 'src/models/lecture/entities/lecture.entity';
import { CertifiedImage } from 'src/models/certified-image/entities/certified-image.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useFactory: async (mysqlConfigService: MysqlConfigService) => ({
        type: 'mysql' as DatabaseType,
        host: mysqlConfigService.host,
        port: mysqlConfigService.port,
        username: mysqlConfigService.username,
        password: mysqlConfigService.password,
        database: mysqlConfigService.database,
        timezone: 'Z',
        charset: 'utf8mb4',
        entities: [
          /**
           * @Entity 리스트 주입
           * /model 에서 정의된 entity 를 추가한다.
           */
          User,
          LectureReview,
          Lecture,
          CertifiedImage,
        ],
        synchronize: true,
      }),
      inject: [MysqlConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class MysqlDatabaseProviderModule {}
