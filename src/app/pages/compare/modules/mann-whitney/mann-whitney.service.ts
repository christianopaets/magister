import { Injectable } from '@angular/core';
import {Student} from '../../../../models/Student';
import {Group} from '@models/Group';
import {IError} from '@models/Error';
import {MethodInterface} from '@shared/default/MethodInterface';

@Injectable({
  providedIn: 'root'
})
export class MannWhitneyService implements MethodInterface{

  public fullGroup: Array<{ group: number, student: Student, rang?: number, index?: number }>;
  public firstGroup: Group;
  public secondGroup: Group;

  public error: IError;

  constructor() { }

  createFullGroup(group1: Student[], group2: Student[]) {
    this.fullGroup = group1.map((student: Student) => {
      return { group: 1, student: student };
    });
    this.fullGroup = this.fullGroup.concat(group2.map((student: Student) => {
      return { group: 2, student: student };
    }));
    this.fullGroup.sort((student1, student2) => {
      return student2.student.mark - student1.student.mark;
    });
    this.fullGroup = this.fullGroup.map((student, index) => {
      student.index = this.fullGroup.length - index;
      return student;
    });
    this.fullGroup = this.fullGroup.map((student) => {
      const sameMark = this.fullGroup.filter(value => value.student.mark === student.student.mark);
      const rangSum = sameMark.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.index;
      }, 0);
      student.rang = rangSum / sameMark.length;
      return student;
    });
  }

  private _calcUEmp() {
    const firstGroup = this.fullGroup.filter(value => value.group === 1).reduce((previousValue: number, value) => {
      return previousValue + value.rang;
    }, 0);
    const secondGroup = this.fullGroup.filter(value => value.group === 2).reduce((previousValue: number, value) => {
      return previousValue + value.rang;
    }, 0);
    let Tx = secondGroup;
    let nx = this.secondGroup.students.length;
    if (firstGroup > secondGroup) {
      Tx = firstGroup;
      nx = this.firstGroup.students.length;
    }
    return (this.firstGroup.students.length * this.secondGroup.students.length) + ( (nx * (nx + 1)) / 2) - Tx;
  }

  public run(groups: Group[]) {
    this.firstGroup = groups[0];
    this.secondGroup = groups[1];
    this.createFullGroup(groups[0].students, groups[1].students);
    console.log(this._calcUEmp());
  }

  public canBeCalled(groups: Group[]) {
    if (groups.length !== 2) {
      this.error = {
        code: 1,
        message: 'More than 2 groups'
      };
      return false;
    }

    if (groups[0].students.length < 3 || groups[1].students.length < 3) {
      this.error = {
        code: 2,
        message: 'Group with less than 3 students'
      };
      return false;
    }

    if (groups[0].students.length > 60 || groups[1].students.length > 60) {
      this.error = {
        code: 3,
        message: 'Group with more than 60 students'
      };
      return false;
    }

    this.error = {
      code: 0,
      message: 'common.no-error'
    };
    return true;
  }
}
