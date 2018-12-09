import {Student} from './Student';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Group {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20
  })
  name: string;

  @OneToMany(type => Student, student => student.group)
  students: Student[];
}
