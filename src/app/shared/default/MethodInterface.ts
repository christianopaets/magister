import {Student} from '../../models/Student';

export interface MethodInterface {
  error: {code: number, message: string};
  canBeCalled(students: Array<Student[]>): boolean;
  run(students: Array<Student[]>): any;
}
