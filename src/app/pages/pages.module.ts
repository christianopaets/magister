import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import {PagesRoutingModule} from './pages-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {StudentsService} from '../shared/services/students.service';
import {RozenbaumService} from '../shared/services/rozenbaum.service';
import { CompareComponent } from './compare/compare.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule
  ],
  declarations: [TestComponent, CompareComponent],
  providers: [
    StudentsService,
    RozenbaumService
  ]
})
export class PagesModule { }
