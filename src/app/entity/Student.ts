import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
}
