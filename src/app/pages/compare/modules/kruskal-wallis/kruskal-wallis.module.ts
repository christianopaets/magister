import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KruskalWallisComponent} from './kruskal-wallis.component';
import {KruskalWallisService} from './kruskal-wallis.service';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '@shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule
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
