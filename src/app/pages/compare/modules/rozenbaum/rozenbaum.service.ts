import { Injectable } from '@angular/core';
import {p001, p005} from './rozenbaum';
import {MethodInterface} from '@shared/default/MethodInterface';
import {Student} from '@models/Student';
import {Group} from '@models/Group';
import {IError} from '@models/Error';

@Injectable({
  providedIn: 'root'
})
export class RozenbaumService implements MethodInterface {

  public firstGroup: Group;
  public secondGroup: Group;
  public QEMP: number;

  public error: IError;

  constructor() { }

  sortArrays(group_1: Group, group_2: Group) {
    const group1Sorted = group_1;
    group1Sorted.students = group1Sorted.students.sort((a, b) => {
      return b.mark - a.mark;
    });
    const group2Sorted = group_2;
    group2Sorted.students = group2Sorted.students.sort((a, b) => {
      return b.mark - a.mark;
    });
    if (group1Sorted.students[0].mark > group2Sorted.students[0].mark) {
      this.firstGroup = group1Sorted;
      this.secondGroup = group2Sorted;
    } else {
      this.firstGroup = group2Sorted;
      this.secondGroup = group1Sorted;
    }
  }

  findQEMP() {
    const maxGroup2 = this.secondGroup.students[0];
    const minGroup1 = this.firstGroup.students[this.firstGroup.students.length - 1];
    const first = this.firstGroup.students.find((student: Student) => {
      return student.mark <= maxGroup2.mark;
    });
    const S1 = this.firstGroup.students.indexOf(first);
    const last = this.secondGroup.students.find((student: Student) => {
      return student.mark < minGroup1.mark;
    });
    const S2 = this.secondGroup.students.length - this.secondGroup.students.indexOf(last);
    this.QEMP = S1 + S2;
  }

  showResult(): Group {
    let P001 = p001[this.firstGroup.students.length - 11][this.secondGroup.students.length - 11];
    let P005 = p005[this.firstGroup.students.length - 11][this.secondGroup.students.length - 11];
    if (this.firstGroup.students.length > 26 || this.secondGroup.students.length > 26) {
      P001 = 10;
      P005 = 8;
    }
    if ( P001 < this.QEMP || P005 < this.QEMP ) {
      return this.firstGroup;
    }
    return this.secondGroup;
  }

  canBeCalled(groups: Group[]) {
    if (groups.length !== 2) {
      this.error = {
        code: 1,
        message: 'There are more or less than 2 groups'
      };
      return false;
    }
    if (groups[0].students.length < 11 || groups[1].students.length < 11) {
      this.error = {
        code: 2,
        message: 'There is a group with less than 11 students'
      };
      return false;
    }
    if (groups[0].students.length <= 50 && groups[1].students.length <= 50
      && Math.abs(groups[0].students.length - groups[1].students.length) > 10) {
      this.error = {
        code: 3,
        message: 'The students length in both group is less than 50 and the difference between lengths is more than 10'
      };
      return false;
    }
    if (
      groups[0].students.length > 50 && groups[1].students.length > 50
      && groups[0].students.length <= 100 && groups[1].students.length <= 100
      && Math.abs(groups[0].students.length - groups[1].students.length) > 20
    ) {
      this.error = {
        code: 4,
        message: 'The students length in both group is less than 100 and the difference between lengths is more than 20'
      };
      return false;
    }
    if (groups[0].students.length > 100 && groups[1].students.length > 100) {
      let more = groups[1].students.length;
      let less = groups[0].students.length;
      if (groups[0].students.length > groups[1].students.length) {
        more = groups[0].students.length;
        less = groups[1].students.length;
      }
      if (more / less > 1.75) {
        this.error = {
          code: 5,
          message: 'The students length in both group is more than 100 and the difference between lengths is more than 2 times'
        };
        return false;
      }
    }

    this.error = {
      code: 0,
      message: 'common.no-error'
    };
    return true;
  }

  run(groups: Group[]): Group {
    this.sortArrays(groups[0], groups[1]);
    this.findQEMP();
    return this.showResult();
  }

  get groupsSorted(): Group[] {
    if (!this.firstGroup || !this.secondGroup) {
      return [];
    }
    return [this.firstGroup, this.secondGroup];
  }

}
