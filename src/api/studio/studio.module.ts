import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
@Module({
  controllers: [StudioController],
  providers: [StudioService],
  imports: [PrismaModule]
})
export class StudioModule { }
