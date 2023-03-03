import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    SharedModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
