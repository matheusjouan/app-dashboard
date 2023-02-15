import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<Category>(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${category.id}`;

    return this.http.put<Category>(url, category).pipe(
      catchError(this.handleError),
      map(() => category))
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private handleError(error: any): Observable<any> {
    console.log(`Erro na requisição => ${error.status}`);
    return of(error);
  }

  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => {
      var category = Object.assign(new Category(), element)
      categories.push(category);
    });

    return categories;
  }

  private jsonDataToCategory(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}
