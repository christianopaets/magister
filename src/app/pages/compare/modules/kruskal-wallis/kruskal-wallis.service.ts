import {Injectable} from '@angular/core';
import {Student} from '@models/Student';
import {Group} from '@models/Group';
import {IError} from '@models/Error';
import {MethodInterface} from '@shared/default/MethodInterface';

@Injectable()
export class KruskalWallisService implements MethodInterface {

  public fullGroup: Array<{ group: number, student: Student, rang?: number, index?: number }> = [];

  public groups: Group[];

  public error: IError;

  public HEmp: number;

  public run(groups: Group[]): any {
    this.groups = groups;
    this.createFullGroup();
    this.HEmp = this.calcHEmp();
    console.log(this.HEmp);
  }

  public createFullGroup() {
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
    return ( (12 / this.groups.length * (this.groups.length + 1)) * this.rangSum() ) - ( 3 * (this.groups.length + 1) );
  }

  public rangSum(): number {
    return this.groups.reduce((prevValue: number, group: Group, index: number) => {
      const rangPerGroup = this.rangPerGroup(index + 1);
      return prevValue + (rangPerGroup * rangPerGroup / group.students.length);
    }, 0);
  }

  public rangPerGroup(index: number): number {
    return this.fullGroup
      .filter(value => value.index === index)
      .reduce((prevValue: number, value) => {
        return prevValue + value.rang;
      }, 0);
  }

  public canBeCalled(groups: Group[]) {
    if (groups.length < 3) {
      this.error = {
        code: 1,
        message: 'Less than 3 groups'
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
