import {Student} from '@models/Student';

export interface IMannWhitney {
  group: number;
  student: Student;
  rang?: number;
  index?: number;
}
