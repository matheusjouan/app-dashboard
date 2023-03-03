import { BaseResourceService } from 'src/app/shared/services/base-rsource.service';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { CategoryService } from './../../category/shared/category.service';
import { Entry } from './entry.model';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(private injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.fromJson);
  }

  public override create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.create(entry);
      }),
      catchError(this.handleError)
    );
  }

  public override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;
        return super.update(entry);
      }),
      catchError(this.handleError)
    );
  }

  // Fazendo na mão, caso o backend não tivesse implementado um endpoit que retorna essa resposta

  public getEntriesByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      // Faz o parse retornando um objeto tipo Date
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMaches = entryDate.month() + 1 == month;
      const yearMaches = entryDate.year() == year;

      if (monthMaches && yearMaches) return entry;
      else
        return;
    })
  }
}
