import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { registerViewsModule } from './utils';
import { EncryptionService, LiftoffConfigService } from './services';

@Module({
  imports: [ConfigModule.forRoot(), registerViewsModule(__dirname, [])],
  providers: [EncryptionService, LiftoffConfigService],
  exports: [EncryptionService, LiftoffConfigService],
})
export class CommonModule { }
