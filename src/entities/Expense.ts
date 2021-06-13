import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Owner } from '@entities/Owner';

@Entity('expenses')
export class Expense {
  @PrimaryColumn()
  id: string;

  @Column()
  purchase_date: Date;

  @Column()
  purchase_place: string;

  @Column({ type: 'numeric', scale: 2, precision: 10 })
  price: number;

  @ManyToOne(() => Owner, owner => owner.expenses)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: Owner;

  @Column()
  owner_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    this.id = this.id || uuid();
  }
}
