import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RozenbaumComponent} from './rozenbaum.component';
import {RozenbaumService} from './rozenbaum.service';

@NgModule({
  imports: [
    CommonModule
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
