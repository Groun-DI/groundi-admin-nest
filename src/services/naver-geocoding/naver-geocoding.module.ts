import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NaverGeocodingService } from './naver-geocoding.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [NaverGeocodingService],
  exports: [NaverGeocodingService]
})
export class NaverGeocodingModule { }
