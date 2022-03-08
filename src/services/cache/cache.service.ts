import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    console.log(this.configService.get('REDIS_HOST'));
  }

  async add(phoneNumber: string, authCode: string): Promise<boolean> {
    console.log(phoneNumber, authCode);
    const res = await this.cacheManager.set(phoneNumber, authCode, {
      ttl: 60 * 3,
    });

    return true;
  }

  async verify(phoneNumber: string, authCode: string): Promise<boolean> {
    const code = await this.cacheManager.get(phoneNumber);

    console.log(code === authCode);
    return code === authCode;
  }

  async delete(phoneNumber: string): Promise<void> {
    return await this.cacheManager.del(phoneNumber);
  }
}
