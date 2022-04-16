import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { Group, User, UserGroup } from './entities';
import { GroupService, UserGroupService, UserService } from './services';
import { GroupController, UserController, UserGroupController } from './controllers';

@Module({
  imports: [CommonModule, MikroOrmModule.forFeature([User, Group, UserGroup])],
  providers: [GroupService, UserService, UserGroupService],
  exports: [GroupService, UserService, UserGroupService],
  controllers: [GroupController, UserController, UserGroupController],
})
export class UserModule { }
