import { Controller, Get } from '@nestjs/common';
import { LiftoffConfig } from '..';

@Controller()
export class ClientSettingsController {
  constructor(private readonly config: LiftoffConfig) {}

  @Get('api/client-settings')
  getClientSettings() {
    return this.config.clientSettings;
  }
}
