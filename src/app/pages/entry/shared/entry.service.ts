import { CategoryService } from './../../category/shared/category.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, mergeMap } from 'rxjs';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiUrl: string = 'api/entries';

  constructor(private http: HttpClient,
              private categoryService: CategoryService) { }

  getAll() : Observable<Entry[]> {
    return this.http.get<Entry[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      map((res: Entry[]) => {
        const entries: Entry[] = [];
        res.forEach(element => {
          const entry = new Entry();
          Object.assign(entry, element)
          entries.push(entry)
        })
        return entries;
      })
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Entry>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  create(entry: Entry): Observable<Entry> {
      return this.categoryService.getById(entry.categoryId).pipe(
        mergeMap(category => {
          entry.category = category;

          return this.http.post<Entry>(this.apiUrl, entry).pipe(
            catchError(this.handleError),
            map(this.jsonDataToEntry)
          )
        })
      )
  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiUrl}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      mergeMap(category => {
        entry.category = category;

        return this.http.put<Entry>(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry))
      })
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error}`);
    return of(error);
  }

  private jsonDataToEntry(jsonData: any): Entry {
    const entry = new Entry();
    return Object.assign(entry, jsonData);
  }
}
