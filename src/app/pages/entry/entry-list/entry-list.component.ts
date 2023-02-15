import { Component } from '@angular/core';
import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent {

  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.getAllEntries();
  }

  public getAllEntries() {
    this.entryService.getAll().subscribe({
      next: (res) => this.entries = res,
      error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
    })
  }

  public deleteEntry(id: number) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');

    if(confirmDelete) {
      this.entryService.delete(id).subscribe({
        next: () => {
          this.entries = this.entries.filter(c => c.id !== id)
        },
        error: (err) => alert(`'Erro ao carregar a lista': ${err.message}`)
      })
    }
  }
}
