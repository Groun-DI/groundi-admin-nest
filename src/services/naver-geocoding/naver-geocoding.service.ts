import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NaverGeocodingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }
  async sendAdress(address: string): Promise<any> {
    
    const url = 'https://naveropenapi.apigw.ntruss.com';
    const uri = this.configService.get('NCP_APIGW_URI'); // uri (include query string)

    const accessId = this.configService.get('NCP_APIGW_API_KEY_ID');
    const secretKey = this.configService.get('NCP_APIGW_API_KEY');

    const header = this.generateHeader(accessId, secretKey);
    return await firstValueFrom(
      this.httpService.get(url + uri, {
        params: {
          query: address,
          count: 100
        },
        headers: header,
      })).then((res) => {
        if (res.status < 300) {
          return res.data;
        }
      });
  }

  private generateHeader = (
    accessId: string,
    secretKey: string,
  ): Record<string, string> => {
    return {
      'Content-Type': 'application/json;charset=utf-8',
      'X-NCP-APIGW-API-KEY-ID': accessId,
      'X-NCP-APIGW-API-KEY': secretKey,
      'Accept': 'application/json'
    };
  };

}


