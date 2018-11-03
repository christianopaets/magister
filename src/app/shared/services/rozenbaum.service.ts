import { Injectable } from '@angular/core';
import {Student} from '../../models/Student';
import {MethodInterface} from '../default/MethodInterface';
import {p001, p005} from '../helpers/rozenbaum';

@Injectable({
  providedIn: 'root'
})
export class RozenbaumService implements MethodInterface {

  public firstGroup: Student[];
  public secondGroup: Student[];
  public QEMP: number;

  public error: { code: number, message: string };

  constructor() { }

  sortArrays(group_1: Student[], group_2: Student[]) {
    const group1Sorted = group_1.sort((a, b) => {
      return b.mark - a.mark;
    });
    const group2Sorted = group_2.sort((a, b) => {
      return b.mark - a.mark;
    });
    if (group1Sorted[0].mark > group2Sorted[0].mark) {
      this.firstGroup = group1Sorted;
      this.secondGroup = group2Sorted;
    } else {
      this.firstGroup = group2Sorted;
      this.secondGroup = group1Sorted;
    }
  }

  findQEMP() {
    const maxGroup2 = this.secondGroup[0];
    const minGroup1 = this.firstGroup[this.firstGroup.length - 1];
    const first = this.firstGroup.find((student: Student) => {
      return student.mark <= maxGroup2.mark;
    });
    const S1 = this.firstGroup.indexOf(first);
    const last = this.secondGroup.find((student: Student) => {
      return student.mark < minGroup1.mark;
    });
    const S2 = this.secondGroup.length - this.secondGroup.indexOf(last);
    this.QEMP = S1 + S2;
  }

  showResult(): Student[] {
    let P001 = p001[this.firstGroup.length - 11][this.secondGroup.length - 11];
    let P005 = p005[this.firstGroup.length - 11][this.secondGroup.length - 11];
    if (this.firstGroup.length > 26 || this.secondGroup.length > 26) {
      P001 = 10;
      P005 = 8;
    }
    if ( P001 < this.QEMP || P005 < this.QEMP ) {
      return this.firstGroup;
    }
    return this.secondGroup;
  }

  canBeCalled(students: Array<Student[]>) {
    if (students.length !== 2) {
      this.error = {
        code: 1,
        message: 'There are more or less than 2 groups'
      };
      return false;
    }
    if (students[0].length < 11 || students[1].length < 11) {
      this.error = {
        code: 2,
        message: 'There is a group with less than 11 students'
      };
      return false;
    }
    if (students[0].length <= 50 && students[1].length <= 50 && Math.abs(students[0].length - students[1].length) > 10) {
      this.error = {
        code: 3,
        message: 'The students length in both group is less than 50 and the difference between lengths is more than 10'
      };
      return false;
    }
    if (
      students[0].length > 50 && students[1].length > 50
      && students[0].length <= 100 && students[1].length <= 100
      && Math.abs(students[0].length - students[1].length) > 20
    ) {
      this.error = {
        code: 4,
        message: 'The students length in both group is less than 100 and the difference between lengths is more than 20'
      };
      return false;
    }
    if (students[0].length > 100 && students[1].length > 100) {
      let more = students[1].length;
      let less = students[0].length;
      if (students[0].length > students[1].length) {
        more = students[0].length;
        less = students[1].length;
      }
      if (more / less > 1.75) {
        this.error = {
          code: 5,
          message: 'The students length in both group is more than 100 and the difference between lengths is more than 2 times'
        };
        return false;
      }
    }
    return true;
  }

  run(students: Array<Student[]>): Student[] {
    this.sortArrays(students[0], students[1]);
    this.findQEMP();
    return this.showResult();
  }

}
