import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StudentsService} from '../../shared/services/students.service';
import {RozenbaumService} from '../../shared/services/rozenbaum.service';
import {Group} from '../../models/Group';
import {MannWhitneyService} from '../../shared/services/mann-whitney.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private studentsService: StudentsService,
    private rozenbaumService: RozenbaumService,
    private mannWhitneyService: MannWhitneyService
  ) { }

  ngOnInit() {
    this.studentsService.getGroups().subscribe((res: {groups: Group[]}) => {
      console.log(res);
      const winner = this.rozenbaumService.run([res.groups[0].students, res.groups[1].students]);
      console.log(winner);
    });
  }

}
