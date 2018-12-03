import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JonckheereComponent} from './jonckheere.component';
import {JonckheereService} from './jonckheere.service';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '@shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [
    JonckheereComponent
  ],
  exports: [
    JonckheereComponent
  ],
  providers: [JonckheereService]
})
export class JonckheereModule {}

