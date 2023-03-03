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
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule)
  },
  {
    path: '', redirectTo: '/reports', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
