import { Injectable } from '@angular/core';
import {Student} from '../../../../models/Student';
import {Group} from '@models/Group';
import {IError} from '@models/Error';
import {MethodInterface} from '@shared/default/MethodInterface';
import {IMannWhitney} from '@models/MannWhitney';
import {IKruskalWallis} from '@models/KruskalWallis';
import {p001, p001_1, p001_2, p005, p005_1, p005_2} from './mann-whitney';
import {WinStrategy} from '@shared/default/win-strategy.enum';

@Injectable({
  providedIn: 'root'
})
export class MannWhitneyService implements MethodInterface {

  public fullGroup: IMannWhitney[] = [];
  public firstGroup: Group;
  public secondGroup: Group;
  public UEmp: number;

  winStrategy: string;

  public error: IError;

  get winStrategyValue(): string {
    return `mann-whitney.${this.winStrategy}`;
  }

  get translateValue() {
    if (!this.winStrategy) {
      return;
    }
    return {
      firstGroup: this.firstGroup.name,
      secondGroup: this.secondGroup.name
    };
  }

  getGroupByIndex(index: number): IKruskalWallis[] {
    return this.fullGroup.filter(group => group.group === index);
  }

  getGroupMarkSum(index: number): number {
    const students = this.getGroupByIndex(index);
    return students.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.student.mark;
    }, 0);
  }

  getGroupMarkAverage(index: number): number {
    return this.getGroupMarkSum(index) / this.getGroupByIndex(index).length;
  }

  getGroupRangSum(index: number): number {
    const students = this.getGroupByIndex(index);
    return students.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rang;
    }, 0);
  }

  getGroupRangAverage(index: number): number {
    return this.getGroupRangSum(index) / this.getGroupByIndex(index).length;
  }

  constructor() { }

  createFullGroup(groups: Group[]) {
    this.firstGroup = groups[0];
    this.secondGroup = groups[1];
    const firstGroupAverage = this.firstGroup.students.reduce((pr, cur) =>  pr + cur.mark, 0);
    const secondGroupAverage = this.secondGroup.students.reduce((pr, cur) => pr + cur.mark, 0);
    if (firstGroupAverage < secondGroupAverage) {
      this.firstGroup = groups[1];
      this.secondGroup = groups[0];
    }
    this.fullGroup = this.firstGroup.students.map((student: Student) => {
      return { group: 1, student: student };
    });
    this.fullGroup = this.fullGroup.concat(this.secondGroup.students.map((student: Student) => {
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
    this.UEmp = (this.firstGroup.students.length * this.secondGroup.students.length) + ( (nx * (nx + 1)) / 2) - Tx;
  }

  private _calcWinStrategy(): void {
    let U005 = 0;
    let U001 = 0;
    let firstLength = this.firstGroup.students.length;
    let secondLength = this.secondGroup.students.length;
    if (secondLength > firstLength) {
      firstLength = this.secondGroup.students.length;
      secondLength = this.firstGroup.students.length;
    }
    if (firstLength <= 20 && secondLength <= 20) {
      U005 = p005[firstLength - 3][secondLength - 2];
      U001 = p001[firstLength - 5][secondLength - 2];
    }
    if (firstLength > 20 && secondLength <= 21) {
      U005 = p005_1[firstLength - 21][secondLength - 4];
      U001 = p001_1[firstLength - 21][secondLength - 4];
    }
    if (firstLength > 21 && secondLength > 21) {
      U005 = p005_2[firstLength - 22][secondLength - 22];
      U001 = p001_2[firstLength - 22][secondLength - 22];
    }
    if (this.UEmp <= U001) {
      this.winStrategy = WinStrategy.H1;
    }
    if (this.UEmp > U005) {
      this.winStrategy = WinStrategy.H0;
    }
  }

  public run(groups: Group[]) {
    this.createFullGroup(groups);
    this._calcUEmp();
    this._calcWinStrategy();
  }

  public canBeCalled(groups: Group[]) {
    if (groups.length !== 2) {
      this.error = {
        code: 1,
        message: 'mann-whitney.code_1'
      };
      return false;
    }

    if (groups[0].students.length < 3 || groups[1].students.length < 3) {
      this.error = {
        code: 2,
        message: 'mann-whitney.code_2'
      };
      return false;
    }

    if (groups[0].students.length > 40 || groups[1].students.length > 40) {
      this.error = {
        code: 3,
        message: 'mann-whitney.code_3'
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
