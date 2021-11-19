import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class NaverSensService {
  private makeSignature(): string {
    const message = [];
    const hmac = crypto.createHmac('sha256', process.env.secretKey);

    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    const timestamp = Date.now().toString();

    message.push(method);
    message.push(space);
    message.push(`/sms/v2/services/${process.env.smsServiceId}/messages`);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(process.env.accessKey);

    const signature = hmac.update(message.join('')).digest('base64');
    return signature.toString();
  }

  async sendSMS(user_phone: string): Promise<string> {
    /**
     * authentication number 생성부
     */
    let AUTHENTICATION_NUMBER = '';
    for (let i = 0; i < 4; i += 1) {
      AUTHENTICATION_NUMBER += Math.floor(Math.random() * 10);
    }

    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.smsServiceId}/messages`;

    const body = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: process.env.callingNumber, // 발신자 번호
      content: `[뭐든지해봐 인증번호] ${AUTHENTICATION_NUMBER} 를 입력해주세요.`,
      messages: [
        {
          to: user_phone, // 수신자 번호
        },
      ],
    };

    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': process.env.accessKey,
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': this.makeSignature(),
      },
    };

    await axios
      .post(url, body, options)
      .then(async (res) => {
        console.log('[sendSMS then] res.data:', res.data);
        console.log(
          '[sendSMS then] AUTHENTICATION_NUMBER:',
          AUTHENTICATION_NUMBER,
        );
      })
      .catch((err) => {
        console.log('[sendSMS catch] err:', err.response.data);
        throw new Error(
          `[sendSMS Error] Failed to issue authentication number and send SMS.`,
        );
      });

    return AUTHENTICATION_NUMBER.toString();
  }
}
