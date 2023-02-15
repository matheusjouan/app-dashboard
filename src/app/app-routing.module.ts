import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'entries',
    loadChildren: () => import('./pages/entry/entry.module').then(m => m.EntryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
