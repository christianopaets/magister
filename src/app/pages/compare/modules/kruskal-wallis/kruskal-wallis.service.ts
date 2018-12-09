import {Injectable} from '@angular/core';
import {Student} from '@models/Student';
import {Group} from '@models/Group';
import {IError} from '@models/Error';
import {MethodInterface} from '@shared/default/MethodInterface';
import {kwValues} from './kruskal-wallis';
import {WinStrategy} from '@shared/default/win-strategy.enum';
import {IKruskalWallis} from '@models/KruskalWallis';

@Injectable()
export class KruskalWallisService implements MethodInterface {

  public fullGroup: IKruskalWallis[] = [];

  public groups: Group[];

  public error: IError;

  public HEmp: number;

  public winStrategy: string;

  get winStrategyValue(): string {
    return `kruskal-wallis.${this.winStrategy}`;
  }

  getGroupByIndex(index: number): IKruskalWallis[] {
    return this.fullGroup.filter(group => group.group === index);
  }

  getGroupRangSum(index: number): number {
    const students = this.getGroupByIndex(index);
    return students.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.rang;
    }, 0);
  }

  setWinStrategy(): void {
    const tendention = this.groups.length - 1;
    const H_005 = kwValues[tendention][0];
    const H_001 = kwValues[tendention][1];
    if (this.HEmp > H_005 || this.HEmp > H_001) {
      this.winStrategy = WinStrategy.H1;
      return;
    }
    this.winStrategy = WinStrategy.H0;
  }

  public createFullGroup(): void {
    this.groups.forEach((group: Group, index: number) => {
      this.fullGroup = this.fullGroup.concat(group.students.map((student: Student) => {
        return {group: index + 1, student: student};
      }));
    });
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

  calcHEmp(): number {
    return ( (12 / (this.fullGroup.length * (this.fullGroup.length + 1))) * this.rangSum() ) - ( 3 * (this.fullGroup.length + 1) );
  }

  public rangSum(): number {
    return this.groups.reduce((prevValue: number, group: Group, index: number) => {
      const rangPerGroup = this.rangPerGroup(index + 1);
      return prevValue + (rangPerGroup * rangPerGroup / group.students.length);
    }, 0);
  }

  public rangPerGroup(index: number): number {
    return this.fullGroup
      .filter(value => value.group === index)
      .reduce((prevValue: number, value) => {
        return prevValue + value.rang;
      }, 0);
  }

  public canBeCalled(groups: Group[]): boolean {
    if (groups.length < 3) {
      this.error = {
        code: 1,
        message: 'kruskal-wallis.code_1'
      };
      return false;
    }

    this.error = {
      code: 0,
      message: 'common.no-error'
    };
    return true;
  }

  public run(groups: Group[]): void {
    this.fullGroup = [];
    this.groups = groups;
    this.createFullGroup();
    this.HEmp = this.calcHEmp();
    this.setWinStrategy();
  }
}
