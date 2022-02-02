import { Migration } from '@mikro-orm/migrations';

export class Migration20220202131803 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` add column `reset_password_token` varchar null;');
  }

}
