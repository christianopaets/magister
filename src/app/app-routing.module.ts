import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'test',
    loadChildren: 'app/pages/pages.module#PagesModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
