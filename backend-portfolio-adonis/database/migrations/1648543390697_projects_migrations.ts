import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProjectsMigrations extends BaseSchema {
  protected tableName = 'projects_migrations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable;
      table.string('techno');
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
