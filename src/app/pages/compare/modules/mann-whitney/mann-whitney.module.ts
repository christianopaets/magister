import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MannWhitneyComponent} from './mann-whitney.component';
import {MannWhitneyService} from './mann-whitney.service';

@NgModule({
  imports: [CommonModule],
  declarations: [MannWhitneyComponent],
  exports: [MannWhitneyComponent],
  providers: [MannWhitneyService]
})
export class MannWhitneyModule {}
