import { CategoryService } from './../../category/shared/category.service';
import { Category } from './../../category/shared/category.model';
import { EntryService } from './../shared/entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Entry } from '../shared/entry.model';

import * as toastr from 'toastr';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  currenctAction!: string;
  entryForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;
  entry: Entry = {} as Entry;
  categories: Category[] = [];

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


  constructor(private entryService: EntryService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  // Chamado depois de verificar todos os conteúdos das diretivas dentro do componente
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  public submitForm() {
    this.submittingForm = true;

    if (this.currenctAction == "new") {
      this.createEntry();
    }
    else {
      this.updateEntry();
    }
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return { text: text, value: value }
      }
    )
  }

  public setPaid(value: boolean) {
    this.entryForm.get('isPaid')?.setValue(value);
  }

  private setCurrentAction() {
    this.currenctAction = this.activatedRoute.snapshot.url[0].path === 'new' ?
      'new' : 'edit'
  }

  private buildEntryForm() {
    this.entryForm = this.fb.group({
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

  private loadEntry() {
    if (this.currenctAction === 'edit') {
      const entryId = Number(this.activatedRoute.snapshot.params['id']);
      this.entryService.getById(entryId).subscribe({
        next: (res) => {
          this.entry = res;
          // Seta os valores no formulário
          this.entryForm.patchValue(this.entry)
        },
        error: (err) => alert(`Ocorreu um erro no servidor: ${err}`)
      })
    }
  }

  private setPageTitle() {
    if(this.currenctAction === 'new')
      this.pageTitle = 'Cadastro de Nova Categoria'
    else {
      const entryName = this.entry.name || '';
      this.pageTitle = `Editando Categoria: ${entryName}`;
    }

  }

  private createEntry() {
    this.entryService.create(this.entryForm.value).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  private updateEntry() {
    this.entryService.update(this.entryForm.value).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  private actionsForSuccess(entry: Entry) {
    console.log(entry);
    toastr.success("Categoria processada com sucesso");
    this.router.navigate(['/entries', entry.id, 'edit'])
  }

  private actionsForError(err: any) {
    toastr.error('Ocorreu um erro ao cadastrar uma nova lançamento');
    this.submittingForm = false;

    if(err.status === 404) {
      this.serverErrorMessage = ['Falha na comunicação com o servidor'];
    }
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => this.categories = res
    });
  }
}
