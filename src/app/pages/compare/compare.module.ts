import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompareComponent} from './compare.component';
import {CompareRoutingModule} from './compare-routing.module';
import {KruskalWallisModule} from './modules/kruskal-wallis/kruskal-wallis.module';
import {GroupsModule} from './modules/groups/groups.module';

@NgModule({
  imports: [
    CommonModule,
    CompareRoutingModule,
    GroupsModule,
    KruskalWallisModule
  ],
  declarations: [CompareComponent],
  exports: [CompareComponent]
})
export class CompareModule {
  
}
