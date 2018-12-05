import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Group} from '@models/Group';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<{groups: Group[]}>('assets/mocks/students.1.json')
      .pipe(map((res: {groups: Group[]}) => res.groups.map(group => {
        return {
          ...group,
          students: group.students.map(student => {
            return {
              ...student,
              mark: +student.mark
            };
          })
        };
      })));
  }
}
