import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateForeignKey1637809337262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'notes',
            new TableColumn({
                name: 'userId',
                type: 'int',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey(
            'notes',
            new TableForeignKey({
                name: 'user_id_fk',
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('notes', 'user_id_fk')
        await queryRunner.dropColumn('notes', 'userId')
    }

}
