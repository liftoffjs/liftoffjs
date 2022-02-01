import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { EmailService } from './services';

@Module({
  imports: [CommonModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
