import { DynamicModule, Module } from '@nestjs/common';
import { EncryptionService, LiftoffConfig } from './services';

@Module({})
export class CommonModule {
  static forRootAsync(options: { environment: Partial<LiftoffConfig> }): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      providers: [
        EncryptionService,
        {
          provide: LiftoffConfig,
          useFactory: () => {
            return LiftoffConfig.load(options.environment);
          },
        },
      ],
      exports: [EncryptionService, LiftoffConfig],
    };
  }
}
