import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from '@shared/components/card/card.component';
import {TranslateModule} from '@ngx-translate/core';
import {ModalComponent} from '@shared/components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    CardComponent,
    ModalComponent
  ],
  exports: [
    CardComponent,
    ModalComponent
  ]
})
export class ComponentsModule {}
