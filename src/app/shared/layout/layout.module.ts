import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderComponent} from '@shared/layout/header/header.component';
import {FooterComponent} from '@shared/layout/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {}
