import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JonckheereComponent} from './jonckheere.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    JonckheereComponent
  ],
  exports: [
    JonckheereComponent
  ],
  providers: [JonckheereComponent]
})
export class JonckheereModule {}

