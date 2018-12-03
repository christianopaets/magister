import {Component, Input} from '@angular/core';
import {IError} from '@models/Error';

@Component({
  selector: 'mag-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  title: string;

  @Input()
  error: IError;

  @Input()
  win: string;
}
