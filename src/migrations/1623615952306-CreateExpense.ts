import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateExpense1623615952306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'expenses',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'purchase_date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'purchase_place',
          type: 'varchar',
        },
        {
          name: 'owner_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'price',
          type: 'decimal',
          scale: 2,
          precision: 10,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });

    const foreignKey = new TableForeignKey({
      name: 'OwnerExpense',
      columnNames: ['owner_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'owners',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryRunner.createTable(table);
    await queryRunner.createForeignKey('expenses', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('expenses', 'OwnerExpense');
    await queryRunner.dropTable('expenses');
  }
}
