import {  Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { NaverSmsService } from './naver-sms.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[HttpModule, ConfigModule],
  providers: [NaverSmsService],
  exports:[NaverSmsService]
})
export class NaverSmsModule {}
