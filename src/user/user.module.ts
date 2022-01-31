import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule, registerViewsModule } from '../common';
import { User } from './entities';
import { UserService } from './services';
import { UserController } from './controllers';

@Module({
  imports: [CommonModule, MikroOrmModule.forFeature([User]), registerViewsModule(__dirname, [])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
