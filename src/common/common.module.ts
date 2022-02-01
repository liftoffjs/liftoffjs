import { Module } from '@nestjs/common';
import { registerViewsModule } from './utils';
import { EncryptionService, LiftoffConfig } from './services';

@Module({
  imports: [registerViewsModule(__dirname, [])],
  providers: [
    EncryptionService,
    {
      provide: LiftoffConfig,
      useFactory: () => {
        return LiftoffConfig.load(require('../../.env.json'));
      },
    },
  ],
  exports: [EncryptionService, LiftoffConfig],
})
export class CommonModule {}
