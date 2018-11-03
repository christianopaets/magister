import { Injectable } from '@angular/core';
import {Student} from '../../models/Student';
import {HttpClient} from '@angular/common/http';
import {PagesModule} from '../../pages/pages.module';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get('assets/mocks/students.json');
  }
}
