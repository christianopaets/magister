import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Group} from './Group';

@Entity()
export class Student {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100
  })
  name: string;

  @Column('double')
  mark: number;

  @ManyToOne(type => Group, group => group.students)
  group: Group;
}
