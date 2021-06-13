import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Expense } from '@entities/Expense';

@Entity('owners')
export class Owner {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Expense, (expense: Expense) => expense.owner)
  expenses: Expense[];

  constructor() {
    this.id = this.id || uuid();
  }
}
