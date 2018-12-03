import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Group} from '@models/Group';
import {JonckheereService} from './jonckheere.service';

@Component({
  selector: 'mag-jonckheere',
  templateUrl: './jonckheere.component.html',
  styleUrls: ['./jonckheere.component.scss']
})
export class JonckheereComponent implements OnChanges {

  @Input() groups: Group[];

  constructor(public jonckheereService: JonckheereService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groups && this.jonckheereService.canBeCalled(this.groups)) {
      console.log(1);
      this.jonckheereService.run(this.groups);
    }
  }
}
