import { Module } from '@nestjs/common';
import { NaverSensService } from './naver-sens.service';
import { NaverSensController } from './naver-sens.controller';

@Module({
  providers: [NaverSensService],
  controllers: [NaverSensController],
})
export class NaverSensModule {}
