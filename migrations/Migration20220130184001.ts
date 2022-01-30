import { Migration } from '@mikro-orm/migrations';

export class Migration20220130184001 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `username` varchar not null, `email` varchar not null, `password` varchar not null, `role` integer not null default 0);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');
  }

}
