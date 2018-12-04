import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from '../../../../models/Group';

@Component({
  selector: ' mag-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent {

  static PULSED = 'pulsed';

  checkIcon = 'check';

  @Input()
  groups: Group[];

  @Input()
  selectedGroups: Group[] = [];

  @Output()
  selected: EventEmitter<Group[]> = new EventEmitter<Group[]>();

  private _pulsed: string = localStorage.getItem(GroupsComponent.PULSED);

  get pulsed(): string {
    return this._pulsed;
  }

  constructor() {
    localStorage.setItem(GroupsComponent.PULSED, 'true');
    this.selected.emit(this.selectedGroups);
  }

  isSelected(group: Group) {
    return this.selectedGroups.indexOf(group) > -1;
  }

  public onSelect(group: Group): void {
    if (!this.isSelected(group)) {
      this.selectedGroups.push(group);
    } else {
      this.selectedGroups.splice(this.selectedGroups.indexOf(group), 1);
    }
    this.selected.emit(this.selectedGroups);
  }

}
