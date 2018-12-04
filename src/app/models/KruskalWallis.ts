import {Student} from '@models/Student';

export interface IKruskalWallis {
  group: number;
  student: Student;
  rang?: number;
  index?: number;
}
