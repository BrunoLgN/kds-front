import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  http = inject(HttpClient);
  API =  environment.SERVIDOR + '/api/categoria';

  constructor() { }

  findAll(): Observable<Categoria[]>{
      return this.http.get<Categoria[]>(this.API+'/findAll');
    }
  
    findById(id: number): Observable<Categoria>{
      return this.http.get<Categoria>(this.API+'/findById/'+id);
    }
  
    findByNomeStartingWithIgnoreCase(nome: string): Observable<Categoria[]>{
      let par = new HttpParams()
      .set('nome',nome);
      
      return this.http.get<Categoria[]>(this.API+'/findByNomeStartingWithIgnoreCase', {params: par});
    }
  
    deleteById(id: number): Observable<string>{
      return this.http.delete<string>(this.API+'/delete/'+id, {responseType: 'text' as 'json'});
    }
  
    save(cidade: Categoria): Observable<string> {
      return this.http.post<string>(this.API+'/save', cidade, {responseType: 'text' as 'json'});
    }
  
    update(cidade: Categoria, id: number): Observable<string> {
      return this.http.put<string>(this.API+'/update/'+id, cidade, {responseType: 'text' as 'json'});  
    }
}
