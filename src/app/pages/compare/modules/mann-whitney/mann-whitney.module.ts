import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MannWhitneyComponent} from './mann-whitney.component';
import {MannWhitneyService} from './mann-whitney.service';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '@shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [MannWhitneyComponent],
  exports: [MannWhitneyComponent],
  providers: [MannWhitneyService]
})
export class MannWhitneyModule {
}
