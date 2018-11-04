import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'compare',
    loadChildren: 'app/pages/compare/compare.module#CompareModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'compare'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
