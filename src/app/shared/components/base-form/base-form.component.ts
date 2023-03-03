import { OnInit, AfterContentChecked, Component, Injector, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceService } from '../../services/base-rsource.service';
import { BaseResourceModel } from '../../models/base-resource.model';

import * as toastr from 'toastr';

@Component({
  template: '',
})

export abstract class BaseFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currenctAction!: string;
  resourceForm!: FormGroup;
  pageTitle!: string;
  serverErrorMessage: string[] = [];
  submittingForm: boolean = false;

  protected activatedRoute!: ActivatedRoute;
  protected router!: Router;
  protected fb!: FormBuilder;

  // resource: é o recurso (instância) que será recebido do Componente que estender esse Componente Genérico
  // função que irá converter jsonData para o tipo T. Será recebida do Componente....
  // Injector, que são serviços utilizados por todo Componente que injetar (mais limpo)
  // Inject() para receber parâmetros do Componente que utilizar essa classe

  constructor(
    @Inject('resource') public resource: T,
    injector: Injector,
    protected baseResourceService: BaseResourceService<T>,
    @Inject('jsonDataToResourceFn') protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.fb = injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  // Chamado depois de verificar todos os conteúdos das diretivas dentro do componente
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  public submitForm() {
    this.submittingForm = true;

    if (this.currenctAction == "new") {
      this.createResource();
    }
    else {
      this.updateResource();
    }
  }

  protected setCurrentAction() {
    this.currenctAction = this.activatedRoute.snapshot.url[0].path === 'new' ?
      'new' : 'edit'
  }

  protected loadResource() {
    if (this.currenctAction === 'edit') {
      const categoryId = Number(this.activatedRoute.snapshot.params['id']);
      this.baseResourceService.getById(categoryId).subscribe({
        next: (res) => {
          this.resource = res;
          // Seta os valores no formulário
          this.resourceForm.patchValue(this.resource)
        },
        error: (err) => alert(`Ocorreu um erro no servidor: ${err}`)
      })
    }
  }

  protected setPageTitle() {
    if(this.currenctAction === 'new')
      this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

    this.baseResourceService.create(resource).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)


    this.baseResourceService.update(resource).subscribe({
      next: (res) => this.actionsForSuccess(res),
      error: (err) => this.actionsForError(err)
    })
  }

  protected actionsForSuccess(resource: T) {
    toastr.success("Solicitação processada com sucesso");
    const baseRoutePath = this.activatedRoute.snapshot.parent?.url[0].path;
    this.router.navigate([baseRoutePath, resource.id, 'edit'])
  }

  protected actionsForError(err: any) {
    toastr.error('Ocorreu um erro ao processar a solicitação');
    this.submittingForm = false;

    if(err.status === 404) {
      this.serverErrorMessage = ['Falha na comunicação com o servidor'];
    }
  }

  // Obriga a implementar essa classe no Componente que tiver estendendo esse FormulárioBase
  // Método responsável por criar o formulário de cada página que herdar
  protected abstract buildResourceForm(): void;

  // Implementar o método que exibe o título na tela de criação
  protected abstract creationPageTitle(): string

  // Implementar o método que exibe o título na tela de edição
  protected abstract editionPageTitle(): string;
}
