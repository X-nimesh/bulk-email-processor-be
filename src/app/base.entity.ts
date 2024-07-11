import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
export class Base extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    select: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  @DeleteDateColumn({ select: false, name: 'deleted_at' })
  public deletedAt: Date;
}
