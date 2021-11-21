import { Body, Controller, Post } from '@nestjs/common';
import { NaverSensService } from './naver-sens.service';

@Controller('naver-sens')
export class NaverSensController {
  constructor(private readonly naverSensService: NaverSensService) {}

  @Post('sendSMS')
  async sendSMS(
    @Body('user_phone') user_phone: string,
  ): Promise<string | null> {
    return await this.naverSensService.sendSMS(user_phone);
  }
}
