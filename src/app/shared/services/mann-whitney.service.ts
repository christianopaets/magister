import { Injectable } from '@angular/core';
import {Student} from '../../models/Student';

@Injectable({
  providedIn: 'root'
})
export class MannWhitneyService {

  public fullGroup: Array<{ group: number, student: Student, rang?: number, index?: number }>;
  public firstGroup: Student[];
  public secondGroup: Student[];
  public firstRangSum: number;
  public secondRangSum: number;
  public firstMarkSum: number;
  public secondMarkSum: number;

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
    console.log(this.fullGroup);
  }
}
