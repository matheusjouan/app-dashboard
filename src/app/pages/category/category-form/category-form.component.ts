import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/category.model';

import * as toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  currenctAction!: string;
  categoryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;
  category: Category = {} as Category;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  // Chamado depois de verificar todos os conteúdos das diretivas dentro do componente
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  public submitForm() {
    this.submittingForm = true;

    if (this.currenctAction == "new") {
      this.createCategory();
    }
    else {
      this.updateCategory();
    }
  }

  private setCurrentAction() {
    this.currenctAction = this.activatedRoute.snapshot.url[0].path === 'new' ?
      'new' : 'edit'
  }

  private buildCategoryForm() {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  private loadCategory() {
    if (this.currenctAction === 'edit') {
      const categoryId = Number(this.activatedRoute.snapshot.params['id']);
      this.categoryService.getById(categoryId).subscribe({
        next: (res) => {
          this.category = res;
          // Seta os valores no formulário
          this.categoryForm.patchValue(this.category)
        },
        error: (err) => alert(`Ocorreu um erro no servidor: ${err}`)
      })
    }
  }

  private setPageTitle() {
    if(this.currenctAction === 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'
    else {
      const categoryName = this.category.name || '';
      this.pageTitle = `Editando Categoria: ${categoryName}`;
    }

  }

  private createCategory() {
    this.categoryService.create(this.categoryForm.value).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  private updateCategory() {
    this.categoryService.update(this.categoryForm.value).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  private actionsForSuccess(category: Category) {
    toastr.success("Categoria processada com sucesso");
    this.router.navigate(['/categories', category.id, 'edit'])
  }

  private actionsForError(err: any) {
    toastr.error('Ocorreu um erro ao cadastrar uma nova categoria');
    this.submittingForm = false;

    if(err.status === 404) {
      this.serverErrorMessage = ['Falha na comunicação com o servidor'];
    }
  }
}
