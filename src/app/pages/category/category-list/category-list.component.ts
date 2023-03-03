import { ButtonProps } from './../../../shared/interfaces/button-props';
import { BreadcrumbItem } from './../../../shared/interfaces/breadcrumb-item';
import { Component } from '@angular/core';

import { BaseItemListComponent } from 'src/app/shared/components/base-item-list/base-item-list.component';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent extends BaseItemListComponent<Category> {

  breadcrumbList: BreadcrumbItem[] = [
    { text: 'Categorias' }
  ]

  pageHeaderButton: ButtonProps = {
    text: '+ Nova Categoria',
    classType: 'btn-success',
    link: 'new'
  }

  constructor(protected categoryService: CategoryService) {
    super(categoryService);
  }
}
