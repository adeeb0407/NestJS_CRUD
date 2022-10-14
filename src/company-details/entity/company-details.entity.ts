/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Addresses } from '../company-addresses.interface';

@Entity()
export class CompanyDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  registrationNumber: number;

  @Column({ type: 'json', nullable: true })
  addresses: Addresses[];

  @Column()
  public industry: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
