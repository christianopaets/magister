import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'mag-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalWindow')
  modal: ElementRef;

  private _modal: M.Modal;

  ngAfterViewInit() {
    M.Modal.init(this.modal.nativeElement);
    this._modal = M.Modal.getInstance(this.modal.nativeElement);
  }

  openModal(): void {
    this._modal.open();
  }
}
