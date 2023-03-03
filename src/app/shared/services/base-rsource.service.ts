import { Observable, catchError, of, map, throwError } from 'rxjs';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResourceModel } from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  private http!: HttpClient;
  private apiUrl!: string;

  /**
   * Recebe uma propriedade chamada jsonDataToResourceFn que é uma função que converterá um jsonData para objeto T
   * Essa função será passada nos serviços que estende a classe serviço genérico
   *
  */

  constructor(apiUrl: string, injector: Injector, private jsonDataResourceFn: (jsonData: any) => T) {
    this.apiUrl = apiUrl;
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      map(jsonData => this.jsonDataToResources(jsonData)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const urlPath = `${this.apiUrl}/${id}`;

    return this.http.get<T>(urlPath).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, resource).pipe(
      // Informa que o contexto do "this" seja a classe que será Instanciada e não do MapSubscriber
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const urlPath = `${this.apiUrl}/${resource.id}`;

    return this.http.put<T>(urlPath, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const urlPath = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(urlPath).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  protected handleError(error: any): Observable<any> {
    console.log(`Error: ${error} | status: ${error.status}`);
    // return throwError(error);
    return throwError(() => {
      const err: any = new Error('Erro no servidor');
      err.status = error.status;
      return err;
    });
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataResourceFn(element)));

    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataResourceFn(jsonData);
  }
}
