import { Module } from '@nestjs/common';
import { TempStudioService } from './tempStudio.service';
import { TempStudioController } from './tempStudio.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  controllers: [TempStudioController],
  providers: [TempStudioService],
  imports: [PrismaModule]
})
export class TempStudioModule { }
