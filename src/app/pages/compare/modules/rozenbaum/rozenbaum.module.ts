import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RozenbaumComponent} from './rozenbaum.component';
import {RozenbaumService} from './rozenbaum.service';
import {ComponentsModule} from '@shared/components/components.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    TranslateModule
  ],
  declarations: [
    RozenbaumComponent
  ],
  exports: [
    RozenbaumComponent
  ],
  providers: [
    RozenbaumService
  ]
})
export class RozenbaumModule {}
