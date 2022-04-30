import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KlidSearchAddressService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }
  async getAddressesOfSearchResults(address: string): Promise<any> {
    const url = 'https://www.juso.go.kr/addrlink/addrLinkApi.do';
    const accessId = 'devU01TX0FVVEgyMDIyMDQzMDE1MDQwNTExMjUyMTY=';
    const resultType = 'json';

    const header = this.generateHeader();
    return await firstValueFrom(
      this.httpService.get(url, {
        params: {
          currentPage: 1,
          countPerPage: 10,
          keyword: address,
          confmKey: accessId,
          resultType: resultType,
        },
        headers: header,
      })).then((res) => {
        if (res.status < 300) {
          return res.data;
        }
      });
  }

  async getAddressDetailInfo(address: string) {

  }

  private generateHeader = (): Record<string, string> => {
    return {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json'
    };
  };

}


