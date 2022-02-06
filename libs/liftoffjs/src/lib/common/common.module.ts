import { DynamicModule, Module } from '@nestjs/common';
import { EncryptionService, LiftoffConfig } from './services';

@Module({})
export class CommonModule {
  static forRoot(options: { config: Partial<LiftoffConfig> }): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      providers: [
        EncryptionService,
        {
          provide: LiftoffConfig,
          useFactory: () => {
            return LiftoffConfig.load(options.config);
          },
        },
      ],
      exports: [EncryptionService, LiftoffConfig],
    };
  }
}
