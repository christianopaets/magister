import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Group} from '../../../../models/Group';
import {KruskalWallisService} from './kruskal-wallis.service';

@Component({
  selector: 'mag-kruskal-wallis',
  templateUrl: './kruskal-wallis.component.html',
  styleUrls: ['./kruskal-wallis.component.scss']
})
export class KruskalWallisComponent implements OnChanges {

  @Input()
  groups: Group[];

  get groupNames(): string {
    return `${this.groups.map(value => value.name).join(', ')}`;
  }

  constructor(public kruskalWallisService: KruskalWallisService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.groups && this.kruskalWallisService.canBeCalled(this.groups)) {
      this.kruskalWallisService.run(this.groups);
    }
  }
}
