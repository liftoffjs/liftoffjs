import { DynamicModule, Module } from '@nestjs/common';
import { EncryptionService, LiftoffConfig } from './services';

@Module({})
export class CommonModule {
  static config: LiftoffConfig;

  static forRoot(options: { config: Partial<LiftoffConfig> }): DynamicModule {
    this.config = LiftoffConfig.load(options.config);

    return {
      module: CommonModule,
      global: true,
      providers: [
        EncryptionService,
        {
          provide: LiftoffConfig,
          useValue: this.config,
        },
      ],
      exports: [EncryptionService, LiftoffConfig],
    };
  }
}
