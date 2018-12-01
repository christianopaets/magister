import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Group} from '@models/Group';
import {RozenbaumService} from './rozenbaum.service';

@Component({
  selector: 'mag-rozenbaum',
  templateUrl: './rozenbaum.component.html',
  styleUrls: ['./rozenbaum.component.scss']
})
export class RozenbaumComponent implements OnChanges {

  @Input() groups: Group[];

  public winGroup: Group;

  constructor(public rozenbaumService: RozenbaumService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groups && this.rozenbaumService.canBeCalled(this.groups)) {
      this.winGroup = this.rozenbaumService.run(this.groups);
    }
  }

}
