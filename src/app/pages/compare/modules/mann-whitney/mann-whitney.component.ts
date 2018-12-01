import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Group} from '@models/Group';
import {MannWhitneyService} from './mann-whitney.service';

@Component({
  selector: 'mag-mann-whitney',
  templateUrl: './mann-whitney.component.html',
  styleUrls: ['./mann-whitney.component.scss']
})
export class MannWhitneyComponent implements OnChanges {

  @Input() groups: Group[];

  constructor(public mannWhitneyService: MannWhitneyService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groups && this.mannWhitneyService.canBeCalled(this.groups)) {
      this.mannWhitneyService.run(this.groups);
    }
  }

}
