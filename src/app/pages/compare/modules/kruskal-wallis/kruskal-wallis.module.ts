import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KruskalWallisComponent} from './kruskal-wallis.component';
import {KruskalWallisService} from './kruskal-wallis.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    KruskalWallisComponent
  ],
  exports: [
    KruskalWallisComponent
  ],
  providers: [
    KruskalWallisService
  ]
})
export class KruskalWallisModule {}
