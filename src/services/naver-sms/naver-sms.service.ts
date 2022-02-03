import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import CryptoJS = require('crypto-js');
import Base64 = require('crypto-js/enc-base64');

@Injectable()
export class NaverSmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendSms(phoneNumber: string): Promise<SmsData> {
    const space = ' '; // one space
    const newLine = '\n'; // new line
    const method = 'POST'; // method
    const url = 'https://sens.apigw.ntruss.com';
    const uri = this.configService.get('NCP_SMS_URI'); // uri (include query string)
    const timestamp = Date.now(); // current timestamp (epoch)

    const accessId = this.configService.get('NCP_ACCESS_ID');
    const secretKey = this.configService.get('NCP_SECRET');

    const baseSignature =
      method + space + uri + newLine + timestamp + newLine + accessId;

    const hmac = CryptoJS.HmacSHA256(baseSignature, secretKey);
    const hash = Base64.stringify(hmac);

    const header = this.generateHeader(timestamp, accessId, hash);
    const smsData = this.generateBody(phoneNumber);

    return await firstValueFrom(
      this.httpService.post(url + uri, smsData.body, {
        headers: header,
      }),
    ).then((res) => {
      if (res.status < 300) {
        return smsData;
      }
    });
  }

  private generateHeader = (
    timestamp: number,
    accessId: string,
    hash: string,
  ): Record<string, string> => {
    return {
      'Content-Type': 'application/json;charset=utf-8',
      'x-ncp-apigw-timestamp': timestamp.toString(),
      'x-ncp-iam-access-key': accessId,
      'x-ncp-apigw-signature-v2': hash,
    };
  };

  private generateBody(phoneNumber: string): SmsData {
    const verifyCode = this.getVerifyCode(6);

    return {
      phoneNum: phoneNumber,
      code: verifyCode,
      body: {
        type: 'sms',
        from: '01038481057',
        content: '그라운디 인증번호는 [' + verifyCode + '] 입니다.',
        messages: [{ to: phoneNumber }],
      },
    };
  }

  private getVerifyCode(range: number): string {
    let code = '';
    for (let i = 0; i < range; i++) {
      code += this.getRandomNumber(10).toString();
    }

    return code;
  }

  private getRandomNumber = (max: number): number =>
    Math.floor(Math.random() * max);
}

interface SmsData {
  phoneNum: string;
  code: string;
  body: SmsBody;
}

interface SmsBody {
  type: string;
  from: string;
  content: string;
  messages: [{ to: string }];
}
