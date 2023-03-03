import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms'

import { BaseFormComponent } from 'src/app/shared/components/base-form/base-form.component';
import { CategoryService } from './../../category/shared/category.service';
import { EntryService } from './../shared/entry.service';

import { Category } from './../../category/shared/category.model';
import { Entry } from '../shared/entry.model';
import { BreadcrumbItem } from 'src/app/shared/interfaces/breadcrumb-item';
import { ButtonProps } from 'src/app/shared/interfaces/button-props';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseFormComponent<Entry> implements OnInit {

  categories: Category[] = [];
  breadcrumbList: BreadcrumbItem[] = [];
  pageHeaderButton: ButtonProps = {
    text: '<< Voltar',
    classType: 'btn-info',
    link: '/entries'
  }

  imaskConfig =  {
    mask: Number, // o tipo da mascara
    scale: 2, // escala: 2 casas depois da virgula
    thousandsSeparator: '.', // separador de milhares
    padFractionalZeros: true, // Adicionar zeros após da virgula se necessário
    normalizeZeros: true,
    radix: ',' // Separador de decimiais, será virgula
  }

  // Objeto de configuração para traduzir
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(private injector: Injector, private entryService: EntryService, private categoryService: CategoryService) {
    super(new Entry(), injector, entryService, Entry.fromJson)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    // Carregar as categorias no dropdown
    this.loadCategories();
  }

  override ngAfterContentChecked(): void {
    super.ngAfterContentChecked();

    this.breadcrumbList = [
      { text: 'Lançamentos', link: '/entries' },
      { text: this.pageTitle }
    ]
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return { text: text, value: value }
      }
    )
  }

  public setPaid(value: boolean) {
    this.resourceForm.get('isPaid')?.setValue(value);
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res
    });
  }

  protected override buildResourceForm() {
    this.resourceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null, [Validators.required, Validators.minLength(2)]],
      type: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      isPaid: [null, Validators.required],
      categoryId: [null, Validators.required]
    })
  }

  protected override creationPageTitle(): string {
    return "Cadastro de Novo Lançamento"
  }


  protected editionPageTitle(): string {
    const categoryName = this.resource.name || "";
    return `Edição do Lançamento ${categoryName}`;
  }
}
