import { BaseResourceService } from 'src/app/shared/services/base-rsource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit, Component } from '@angular/core';

@Component({
  template: '',
})

export abstract class BaseItemListComponent<T extends BaseResourceModel> implements OnInit {

  // Propriedade que armazenará a lista de itens do tipo T (tipo que será definido no Componente que estender)
  public resources: T[] = [];

  // Recebe o serviço específico do componente que estender o componente genérico
  constructor(protected baseResourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
   this.getAllResources();
  }

  protected getAllResources() {
    this.baseResourceService.getAll().subscribe({
      next: (res) => { this.resources = res; console.log(res)},
      error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
    })
  }

  protected deleteResource(id: number) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');

    if(confirmDelete) {
      this.baseResourceService.delete(id).subscribe({
        next: () => {
          this.resources = this.resources.filter(c => c.id !== id)
        },
        error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
      })
    }
  }
}
