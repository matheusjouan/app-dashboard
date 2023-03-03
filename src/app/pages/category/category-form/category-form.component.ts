import { Component, Injector } from '@angular/core';

import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { Validators } from '@angular/forms'
import { Category } from '../shared/category.model';
import { CategoryService } from './../shared/category.service';
import { BreadcrumbItem } from 'src/app/shared/interfaces/breadcrumb-item';
import { ButtonProps } from 'src/app/shared/interfaces/button-props';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})

// Herda de BaseFormComponent<T> passando o tipo do formulário
export class CategoryFormComponent extends BaseFormComponent<Category> {

  breadcrumbList: BreadcrumbItem[] = [];

  pageHeaderButton: ButtonProps = {
    text: '<< Voltar',
    classType: 'btn-info',
    link: '/categories'
  }

  constructor(protected categoryService: CategoryService, protected injector: Injector) {
    // Passando os parâmetros para classe base
    super(new Category(), injector, categoryService, Category.fromJson);
  }

  override ngAfterContentChecked(): void {
    super.ngAfterContentChecked();

    this.breadcrumbList = [
      { text: 'Categorias', link: '/categories' },
      { text: this.pageTitle }
    ]
  }

  // Implementando o Formulário para ser passado para o Componente genérico do formulário
  protected override buildResourceForm() {
    // Utiliza a propriedade resourceForm definido no componente que está extendido
    this.resourceForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Nova Categoria"
  }


  protected editionPageTitle(): string {
    const categoryName = this.resource.name || "";
    return `Edição da Categoria ${categoryName}`;
  }
}
