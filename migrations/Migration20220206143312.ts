import { Migration } from '@mikro-orm/migrations';

export class Migration20220206143312 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `username` varchar not null, `email` varchar not null, `password` varchar not null, `reset_password_token` varchar null, `role` integer not null default 0);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');

    this.addSql('create table `todo` (`id` integer not null primary key autoincrement, `description` varchar not null, `complete` integer not null);');
  }

}
