import { Migration } from '@mikro-orm/migrations';

export class Migration20220416172333 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `username` varchar not null, `email` varchar not null, `password` varchar not null, `reset_password_token` varchar null, `role` text not null default \'user\');');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');

    this.addSql('create table `group` (`id` integer not null primary key autoincrement, `name` varchar not null);');
    this.addSql('create unique index `group_name_unique` on `group` (`name`);');

    this.addSql('create table `user_group` (`id` integer not null primary key autoincrement, `role` text not null default \'user\');');

    this.addSql('create table `todo` (`id` integer not null primary key autoincrement, `description` varchar not null, `complete` integer not null);');

    this.addSql('alter table `user_group` add column `user_id` integer null;');
    this.addSql('alter table `user_group` add column `group_id` integer null;');
    this.addSql('create index `user_group_user_id_index` on `user_group` (`user_id`);');
    this.addSql('create index `user_group_group_id_index` on `user_group` (`group_id`);');
  }

}
