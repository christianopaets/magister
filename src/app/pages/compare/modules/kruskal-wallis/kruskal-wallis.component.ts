import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../models/Group';
import {KruskalWallisService} from './kruskal-wallis.service';

@Component({
  selector: 'mag-kruskal-wallis',
  templateUrl: './kruskal-wallis.component.html',
  styleUrls: ['./kruskal-wallis.component.scss']
})
export class KruskalWallisComponent implements OnInit {

  @Input() groups: Group[];

  constructor(public kruskalWallisService: KruskalWallisService) {}

  ngOnInit(): void {
    this.kruskalWallisService.run(this.groups);
  }



}
