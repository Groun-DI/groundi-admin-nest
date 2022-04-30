import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KlidSearchAddressService } from './klid-search-address.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [KlidSearchAddressService],
  exports: [KlidSearchAddressService]
})
export class KlidSearchAddressModule { }
