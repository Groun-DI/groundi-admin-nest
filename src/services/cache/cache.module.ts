import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheService } from './cache.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
      CacheModule.registerAsync({
        inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
              store: redisStore,
              host: configService.get("REDIS_HOST"),
              port: configService.get("REDIS_PORT"),
              password: configService.get("REDIS_PASSWORD"),
          }),
      }),
    ],
    providers: [CacheService],
    exports: [CacheService]
})
export class RedisCacheModule {}