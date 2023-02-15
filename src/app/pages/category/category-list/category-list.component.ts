import { Component } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res,
      error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
    })
  }

  public deleteCategory(id: number) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');

    if(confirmDelete) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id)
        },
        error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
      })
    }
  }
}
