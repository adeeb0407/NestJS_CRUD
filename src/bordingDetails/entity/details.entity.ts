/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Details {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  registrationNumber: number;

  @Column({ type: 'text', array: true, default: [] })
  address: [];

  @Column()
  industry: string;
}
