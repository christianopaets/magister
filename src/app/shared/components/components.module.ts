import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from '@shared/components/card/card.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class ComponentsModule {}
