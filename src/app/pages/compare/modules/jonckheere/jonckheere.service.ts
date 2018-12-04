import {Injectable} from '@angular/core';
import {Group} from '@models/Group';
import {IError} from '@models/Error';
import {Jonckheere, JonckheereItem} from '@models/Jonkheere';
import {MethodInterface} from '@shared/default/MethodInterface';
import {s001, s005} from './jonkheere';
import {WinStrategy} from '@shared/default/win-strategy.enum';

@Injectable()
export class JonckheereService implements MethodInterface {

  error: IError;
  groups: Jonckheere[];
  SEmp: number;

  winStrategy: string;

  get winStrategyValue(): string {
    return `jonckheere.${this.winStrategy}`;
  }

  canBeCalled(groups: Group[]): boolean {
    if (groups.length < 3) {
      this.error = {
        code: 1,
        message: 'jonckheere.code_1'
      };
      return false;
    }

    if (groups.length > 6) {
      this.error = {
        code: 2,
        message: 'jonckheere.code_2'
      };
      return false;
    }

    this.error = {
      code: 0,
      message: 'common.no-error'
    };
    return true;
  }

  private _setGroups(groups: Group[]): void {
    let min = groups[0].students.length;
    groups.forEach(group => {
      if (group.students.length < min) {
        min = group.students.length;
      }
    });
    if (min > 10) {
      min = 10;
    }
    this.groups = groups.map(value => {
      return {
        name: value.name,
        students: value.students.sort(() => 0.5 - Math.random()).slice(0, min).sort((a, b) => a.mark - b.mark)
      };
    }).sort((a, b) => a.students[0].mark - b.students[0].mark);
  }

  private _calcAdvantages(): void {
    this.groups.forEach((group: Jonckheere, groupIndex: number) => {
      group.students.forEach((student: JonckheereItem, studentIndex: number) => {
        const fromGroups = this.groups.slice(groupIndex + 1);
        let advantages = 0;
        fromGroups.forEach(fromGroup => {
          advantages += fromGroup.students.filter(value => value.mark > student.mark).length;
        });
        this.groups[groupIndex].students[studentIndex].advantage = advantages;
      });
      this.groups[groupIndex].advantageTotal = group.students.reduce((prev, current) => prev + current.advantage, 0);
    });
  }

  private _calcEmp(): void {
    const A = this.groups.reduce((prev, current) => prev + current.advantageTotal, 0);
    const B = this.groups.length * (this.groups.length - 1) / 2 * this.groups[0].students.length * this.groups[0].students.length;
     this.SEmp = 2 * A - B;
  }

  private _calcWinStrategy(): void {
    const groupIndex = this.groups.length - 3;
    const studentIndex = this.groups[0].students.length - 2;
    const S_005 = s005[groupIndex][studentIndex];
    const S_001 = s001[groupIndex][studentIndex];
    if (this.SEmp > S_005 || this.SEmp > S_001) {
      this.winStrategy = WinStrategy.H1;
      return;
    }
    this.winStrategy = WinStrategy.H0;
  }

  run(groups: Group[]): void {
    this._setGroups(groups);
    this._calcAdvantages();
    this._calcEmp();
    this._calcWinStrategy();
  }
}
