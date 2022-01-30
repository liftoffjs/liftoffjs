import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService, LiftoffConfigService } from './services';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [EncryptionService, LiftoffConfigService],
  exports: [EncryptionService, LiftoffConfigService],
})
export class CommonModule { }
