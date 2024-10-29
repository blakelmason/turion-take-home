import { Module } from '@nestjs/common';
import { CspHeaderService } from './csp-header.service';
import { CspHeaderController } from './csp-header.controller';

@Module({
  providers: [CspHeaderService],
  controllers: [CspHeaderController]
})
export class CspHeaderModule {}
