import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompareComponent} from './compare.component';
import {CompareRoutingModule} from './compare-routing.module';
import {KruskalWallisModule} from './modules/kruskal-wallis/kruskal-wallis.module';
import {GroupsModule} from './modules/groups/groups.module';
import {RozenbaumModule} from './modules/rozenbaum/rozenbaum.module';
import {MannWhitneyModule} from './modules/mann-whitney/mann-whitney.module';
import {JonckheereModule} from './modules/jonckheere/jonckheere.module';

@NgModule({
  imports: [
    CommonModule,
    CompareRoutingModule,
    GroupsModule,
    RozenbaumModule,
    KruskalWallisModule,
    MannWhitneyModule,
    JonckheereModule
  ],
  declarations: [CompareComponent],
  exports: [CompareComponent]
})
export class CompareModule {
  
}
